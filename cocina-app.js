    let pedidosPendientes = [];
    let pedidosListos = [];
    let ultimoIdVisto = 0;
    let ventanaCocina = null;
    let intervaloActualizacion = null;
    let ultimoPedidosListosHash = '';
    let ultimoHistorialCocinaHash = '';

    // AudioContext compartido (los navegadores lo suspenden hasta que el usuario interactúe)
    let audioContextCocina = null;

    function obtenerAudioContext() {
      if (!audioContextCocina) {
        audioContextCocina = new (window.AudioContext || window.webkitAudioContext)();
      }
      return audioContextCocina;
    }

    // Desbloquear audio al primer clic o toque en la pantalla de cocina (requisito del navegador)
    function desbloquearAudio() {
      const ctx = obtenerAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => console.log('🔔 Sonido de cocina activado'));
      }
    }

    // Función para generar sonido de campana
    function generarSonidoCampana() {
      const audioContext = obtenerAudioContext();

      function tocarCampana() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        const frecuencia = 800;
        const duracion = 0.3;
        const pausa = 0.1;
        const t = audioContext.currentTime;

        oscillator.frequency.setValueAtTime(frecuencia, t);
        gainNode.gain.setValueAtTime(0.5, t);
        gainNode.gain.exponentialRampToValueAtTime(0.01, t + duracion);
        oscillator.start(t);
        oscillator.stop(t + duracion);

        setTimeout(() => {
          const osc2 = audioContext.createOscillator();
          const gain2 = audioContext.createGain();
          osc2.connect(gain2);
          gain2.connect(audioContext.destination);
          osc2.frequency.setValueAtTime(frecuencia, audioContext.currentTime);
          gain2.gain.setValueAtTime(0.5, audioContext.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duracion);
          osc2.start(audioContext.currentTime);
          osc2.stop(audioContext.currentTime + duracion);
        }, (duracion + pausa) * 1000);

        setTimeout(() => {
          const osc3 = audioContext.createOscillator();
          const gain3 = audioContext.createGain();
          osc3.connect(gain3);
          gain3.connect(audioContext.destination);
          osc3.frequency.setValueAtTime(frecuencia, audioContext.currentTime);
          gain3.gain.setValueAtTime(0.5, audioContext.currentTime);
          gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duracion);
          osc3.start(audioContext.currentTime);
          osc3.stop(audioContext.currentTime + duracion);
        }, (duracion + pausa) * 2000);
      }

      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => tocarCampana()).catch(() => {});
      } else {
        tocarCampana();
      }
    }

    // Función para reproducir sonido de notificación
    function reproducirSonido() {
      const sonidoActivado = localStorage.getItem('cocinaSonidoActivado') !== 'false';
      if (sonidoActivado) {
        try {
          generarSonidoCampana();
        } catch (error) {
          console.error('Error al reproducir sonido:', error);
        }
      }
    }

    // Función para parsear fecha de forma segura
    function parseFechaSeguro(valor) {
      if (valor instanceof Date) return valor;
      if (typeof valor !== 'string') return null;

      // Intentar ISO primero
      const iso = new Date(valor);
      if (!isNaN(iso.getTime())) return iso;

      // Intentar formato local: 16/9/2025, 5:58:46 p. m.
      const re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:,\s*(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(a\. m\.|p\. m\.)\s*)?$/i;
      const m = valor.match(re);
      if (m) {
        const d = parseInt(m[1], 10);
        const mo = parseInt(m[2], 10) - 1;
        const y = parseInt(m[3], 10);
        let h = m[4] ? parseInt(m[4], 10) : 0;
        const min = m[5] ? parseInt(m[5], 10) : 0;
        const s = m[6] ? parseInt(m[6], 10) : 0;
        const ampm = m[7] ? m[7].toLowerCase() : null;
        if (ampm && ampm.includes('p. m.') && h < 12) h += 12;
        if (ampm && ampm.includes('a. m.') && h === 12) h = 0;
        const dt = new Date(y, mo, d, h, min, s);
        if (!isNaN(dt.getTime())) return dt;
      }
      return null;
    }

    // Función para comparar fechas (solo año/mes/día)
    function esMismaFechaLocal(fechaA, fechaB = new Date()) {
      try {
        const a = parseFechaSeguro(fechaA);
        const b = parseFechaSeguro(fechaB) || new Date();
        if (!a) return false;
        return a.getFullYear() === b.getFullYear() &&
               a.getMonth() === b.getMonth() &&
               a.getDate() === b.getDate();
      } catch (e) {
        return false;
      }
    }

    // Función auxiliar para obtener IDs de pedidos listos (compatibilidad)
    function obtenerIdsPedidosListos() {
      try {
        const pedidosListos = JSON.parse(localStorage.getItem('pedidosCocinaListos') || '[]');
        // Si es la estructura antigua (array de números), devolverla tal cual
        if (pedidosListos.length > 0 && typeof pedidosListos[0] === 'number') {
          return pedidosListos;
        }
        // Si es la nueva estructura (array de objetos), extraer los IDs
        return pedidosListos.map(p => p.id);
      } catch (error) {
        console.error('Error al obtener IDs de pedidos listos:', error);
        return [];
      }
    }

    // Función para obtener pedidos pendientes desde localStorage
    function obtenerPedidosPendientes() {
      try {
        const historialCocina = JSON.parse(localStorage.getItem('historialCocina') || '[]');
        const pedidosListosIds = obtenerIdsPedidosListos(); // Usar función auxiliar
        
        // Obtener fecha de hoy para filtrar
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        // Filtrar solo los pedidos que:
        // 1. No están marcados como listos
        // 2. Son del día actual
        const pendientes = historialCocina.filter(pedido => {
          // Verificar que no esté marcado como listo
          if (pedidosListosIds.includes(pedido.id)) {
            return false;
          }
          
          // Verificar que sea del día actual
          try {
            let fechaPedido = null;
            
            // Intentar parsear la fecha del pedido
            if (pedido.fecha) {
              if (typeof pedido.fecha === 'string') {
                fechaPedido = parseFechaSeguro(pedido.fecha);
              } else if (pedido.fecha instanceof Date) {
                fechaPedido = pedido.fecha;
              }
            }
            
            if (!fechaPedido) {
              return false; // Si no se puede parsear la fecha, no mostrar
            }
            
            // Comparar solo año, mes y día
            const fechaPedidoNormalizada = new Date(fechaPedido);
            fechaPedidoNormalizada.setHours(0, 0, 0, 0);
            
            return esMismaFechaLocal(fechaPedidoNormalizada, hoy);
          } catch (e) {
            console.error('Error al parsear fecha del pedido:', e, pedido);
            return false; // Si hay error al parsear, no mostrar
          }
        });

        // Ordenar por fecha (más antiguos primero)
        pendientes.sort((a, b) => {
          const fechaA = new Date(a.fecha || 0);
          const fechaB = new Date(b.fecha || 0);
          return fechaA - fechaB;
        });

        return pendientes;
      } catch (error) {
        console.error('Error al obtener pedidos pendientes:', error);
        return [];
      }
    }

    // Función para obtener pedidos listos
    function obtenerPedidosListos() {
      try {
        const historialCocina = JSON.parse(localStorage.getItem('historialCocina') || '[]');
        const pedidosListos = JSON.parse(localStorage.getItem('pedidosCocinaListos') || '[]');
        const pedidosListosIds = obtenerIdsPedidosListos(); // Obtener IDs para comparar
        
        // Obtener fecha de hoy para filtrar
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        // Filtrar solo los pedidos que:
        // 1. Están marcados como listos
        // 2. Son del día actual
        const listos = historialCocina.filter(pedido => {
          // Verificar que esté marcado como listo
          if (!pedidosListosIds.includes(pedido.id)) {
            return false;
          }
          
          // Agregar información de fecha/hora de marcado como listo
          const infoListo = pedidosListos.find(p => (typeof p === 'object' ? p.id : p) === pedido.id);
          if (infoListo && typeof infoListo === 'object') {
            pedido.fechaHoraListo = infoListo.fechaHoraListo;
            pedido.fechaHoraListoMostrar = infoListo.fechaHoraListoMostrar || infoListo.fechaHoraListo;
          }
          
          // Verificar que sea del día actual
          try {
            let fechaPedido = null;
            
            // Priorizar fecha ISO si existe, sino usar fecha (puede ser formato local)
            const fechaAUsar = pedido.fecha || pedido.fechaMostrar;
            
            if (fechaAUsar) {
              if (typeof fechaAUsar === 'string') {
                // Intentar parsear como fecha ISO primero (más confiable)
                const fechaISO = new Date(fechaAUsar);
                if (!isNaN(fechaISO.getTime())) {
                  fechaPedido = fechaISO;
                } else {
                  // Si no es ISO, intentar parsear como formato local
                  fechaPedido = parseFechaSeguro(fechaAUsar);
                }
              } else if (fechaAUsar instanceof Date) {
                fechaPedido = fechaAUsar;
              }
            }
            
            if (!fechaPedido) {
              console.warn('No se pudo parsear fecha del pedido:', pedido);
              return false;
            }
            
            const fechaPedidoNormalizada = new Date(fechaPedido);
            fechaPedidoNormalizada.setHours(0, 0, 0, 0);
            
            return esMismaFechaLocal(fechaPedidoNormalizada, hoy);
          } catch (e) {
            console.error('Error al parsear fecha del pedido:', e, pedido);
            return false;
          }
        });

        // Ordenar por fecha de marcado como listo (más recientes primero)
        listos.sort((a, b) => {
          const fechaA = new Date(a.fecha || 0);
          const fechaB = new Date(b.fecha || 0);
          return fechaB - fechaA;
        });

        return listos;
      } catch (error) {
        console.error('Error al obtener pedidos listos:', error);
        return [];
      }
    }

    // Función para detectar nuevos pedidos
    function detectarNuevosPedidos(pedidosActuales) {
      const nuevosPedidos = pedidosActuales.filter(pedido => pedido.id > ultimoIdVisto);
      if (nuevosPedidos.length > 0) {
        ultimoIdVisto = Math.max(...pedidosActuales.map(p => p.id));
        return true;
      }
      return false;
    }

    // Función para formatear código de pedido
    function formatearCodigoPedido(mesa) {
      if (mesa.startsWith('DOM-')) {
        return `DOMICILIO ${mesa.replace('DOM-', '')}`;
      } else if (mesa.startsWith('REC-')) {
        return `RECOGER ${mesa.replace('REC-', '')}`;
      } else {
        return `MESA ${mesa}`;
      }
    }

    // Función para renderizar un pedido (totalPedidos = cuántos hay en pantalla para escalar tamaño)
    function renderizarPedido(pedido, esListo = false, totalPedidos = 1) {
      const codigo = formatearCodigoPedido(pedido.mesa);
      const esNuevo = pedido.id > ultimoIdVisto && !esListo;
      const items = pedido.items || [];
      const numItems = items.length;
      const muchosItems = numItems >= 2;
      const esDomicilio = (pedido.mesa || '').toString().startsWith('DOM-');
      const esRecoger = (pedido.mesa || '').toString().startsWith('REC-');
      const claseItems = numItems >= 4 && numItems <= 12 ? `items-${numItems}` : (numItems > 12 ? 'items-12' : '');
      const claseTotal = totalPedidos >= 7 && totalPedidos <= 16 ? `total-${totalPedidos}` : (totalPedidos > 16 ? 'total-16' : '');

      let infoCliente = '';
      if (pedido.cliente) {
        infoCliente = `
          <div class="pedido-info-item">
            <strong><i class="fas fa-user"></i> Cliente:</strong> ${pedido.cliente}
          </div>
        `;
        if (pedido.telefono) {
          infoCliente += `
            <div class="pedido-info-item">
              <strong><i class="fas fa-phone"></i> Teléfono:</strong> ${pedido.telefono}
            </div>
          `;
        }
        if (pedido.direccion && pedido.mesa.startsWith('DOM-')) {
          infoCliente += `
            <div class="pedido-info-item">
              <strong><i class="fas fa-map-marker-alt"></i> Dirección:</strong> ${pedido.direccion}
            </div>
          `;
        }
        if (pedido.horaRecoger && pedido.mesa.startsWith('REC-')) {
          infoCliente += `
            <div class="pedido-info-item">
              <strong><i class="fas fa-clock"></i> Hora Recoger:</strong> ${pedido.horaRecoger}
            </div>
          `;
        }
      }

      /* Mismo formato que el recibo imprimible: tabla Cant | Producto con Detalle */
      const productosHTML = `
        <table class="tabla-recibo-cocina">
          <thead>
            <tr>
              <th class="th-cant">Cant</th>
              <th class="th-producto">Producto</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => {
              const detalle = item.detalles ? `
                <div class="producto-detalle">Detalle: ${item.detalles}</div>
              ` : '';
              return `
                <tr class="producto-fila">
                  <td class="td-cant">${item.cantidad}</td>
                  <td class="td-producto">
                    <div class="producto-nombre">${item.nombre}</div>
                    ${detalle}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;

      // Información de cambio de mesa si existe (compacta para no quitar espacio a los productos)
      let infoCambioMesa = '';
      if (pedido.cambioMesa) {
        const pedidosPend = obtenerPedidosPendientes();
        const cantidad = pedidosPend.length;
        const compacto = cantidad >= 5;
        // Versión compacta: una línea para que la tabla Cant|Producto tenga más espacio
        infoCambioMesa = `
          <div class="cambio-mesa-alert">
            <div class="cambio-mesa-linea" title="Pedido movido de Mesa ${pedido.cambioMesa.origen} a Mesa ${pedido.cambioMesa.destino}. Fecha: ${pedido.cambioMesa.fecha}">
              ⚠️ Mesa <strong>${pedido.cambioMesa.origen}</strong> → Mesa <strong>${pedido.cambioMesa.destino}</strong>
              ${compacto ? '' : ` · ${pedido.cambioMesa.fecha}`}
            </div>
          </div>
        `;
      }

      // Información de fecha/hora cuando se marcó como listo
      let infoListo = '';
      if (esListo && pedido.fechaHoraListoMostrar) {
        infoListo = `
          <div class="pedido-info-item" style="background: rgba(40, 167, 69, 0.2); border-left: 4px solid #28a745;">
            <strong><i class="fas fa-check-circle"></i> Listo desde:</strong> ${pedido.fechaHoraListoMostrar}
          </div>
        `;
      }

      const botonListo = esListo ? '' : `
        <div class="pedido-acciones">
          <button class="btn-listo" onclick="marcarPedidoListo(${pedido.id})">
            <i class="fas fa-check-circle"></i> LISTO
          </button>
        </div>
      `;

      const clasesCard = [
        esListo ? 'listo' : '',
        esNuevo ? 'nuevo' : '',
        muchosItems ? 'muchos-items' : '',
        esDomicilio ? 'es-domicilio' : '',
        esRecoger ? 'es-recoger' : '',
        pedido.cambioMesa ? 'tiene-cambio-mesa' : '',
        claseItems,
        claseTotal
      ].filter(Boolean).join(' ');

      return `
        <div class="pedido-card ${clasesCard}" data-pedido-id="${pedido.id}">
          <div class="pedido-header">
            <div class="pedido-codigo">${codigo}</div>
            <div class="pedido-ronda">Ronda ${pedido.ronda || 1}</div>
          </div>
          ${infoCambioMesa}
          <div class="pedido-info">
            <div class="pedido-info-item">
              <strong><i class="fas fa-calendar"></i> Fecha:</strong> ${pedido.fechaMostrar || pedido.fecha || 'N/A'}
            </div>
            ${infoCliente}
            ${infoListo}
          </div>
          <div class="productos-lista">
            ${productosHTML}
          </div>
          ${botonListo}
        </div>
      `;
    }

    // Función para marcar pedido como listo (desde la pantalla de cocina)
    function marcarPedidoListo(pedidoId) {
      try {
        let pedidosListos = JSON.parse(localStorage.getItem('pedidosCocinaListos') || '[]');
        
        // Migrar estructura antigua (array de IDs) a nueva (array de objetos)
        if (pedidosListos.length > 0 && typeof pedidosListos[0] === 'number') {
          pedidosListos = pedidosListos.map(id => ({
            id: id,
            fechaHoraListo: new Date().toISOString(),
            fechaHoraListoMostrar: new Date().toLocaleString()
          }));
        }
        
        // Verificar si el pedido ya está marcado como listo
        const yaMarcado = pedidosListos.some(p => (typeof p === 'object' ? p.id : p) === pedidoId);
        
        if (!yaMarcado) {
          // Agregar el pedido con la fecha/hora
          const fechaHoraListo = new Date().toISOString();
          const fechaHoraListoMostrar = new Date().toLocaleString();
          
          pedidosListos.push({
            id: pedidoId,
            fechaHoraListo: fechaHoraListo,
            fechaHoraListoMostrar: fechaHoraListoMostrar
          });
          
          localStorage.setItem('pedidosCocinaListos', JSON.stringify(pedidosListos));
          console.log('✅ Pedido marcado como listo desde cocina. ID:', pedidoId, 'Hora:', fechaHoraListoMostrar);
          
          // Disparar evento personalizado para notificar a otras ventanas
          window.dispatchEvent(new CustomEvent('pedidoMarcadoListo', { detail: { pedidoId } }));
          
          // Actualizar la vista
          actualizarVista();
        }
      } catch (error) {
        console.error('Error al marcar pedido como listo:', error);
      }
    }


    // Función para ajustar el grid de manera inteligente (estilo Netflix - sin scroll)
    function ajustarGrid(cantidadPedidos) {
      const MAX_TARJETAS = 16;
      const cantidad = Math.min(cantidadPedidos, MAX_TARJETAS);
      const contenedorPendientes = document.getElementById('pedidosPendientes');
      
      if (!contenedorPendientes || cantidad === 0) {
        return;
      }
      
      // Agregar clase para transición suave
      contenedorPendientes.classList.add('ajuste-dinamico');
      
      // Obtener dimensiones del contenedor
      const anchoContenedor = contenedorPendientes.offsetWidth || window.innerWidth - 100;
      const altoContenedor = contenedorPendientes.offsetHeight || window.innerHeight - 200;
      const gap = 15; // Gap fijo entre tarjetas
      
      // Calcular el mejor layout (columnas x filas) que quepa en la pantalla
      let mejorLayout = { columnas: 1, filas: 1, anchoTarjeta: 0, altoTarjeta: 0 };
      let mejorAjuste = Infinity;
      
      // Probar diferentes números de columnas (de 1 a 6)
      for (let columnas = 1; columnas <= 6; columnas++) {
        const filas = Math.ceil(cantidad / columnas);
        
        // Calcular dimensiones de tarjeta para este layout
        const anchoTarjeta = (anchoContenedor - (gap * (columnas - 1))) / columnas;
        const altoTarjeta = (altoContenedor - (gap * (filas - 1))) / filas;
        
        // Verificar que las tarjetas quepan razonablemente (mínimo 150px de ancho y 100px de alto)
        if (anchoTarjeta >= 150 && altoTarjeta >= 100) {
          // Calcular qué tan bien se ajusta (preferir layouts más cuadrados)
          const ratio = Math.abs(anchoTarjeta / altoTarjeta - 1);
          const espacioUsado = (anchoTarjeta * columnas + gap * (columnas - 1)) * (altoTarjeta * filas + gap * (filas - 1));
          const espacioDisponible = anchoContenedor * altoContenedor;
          const eficiencia = espacioUsado / espacioDisponible;
          
          // Preferir layouts que usen mejor el espacio y sean más cuadrados
          const ajuste = ratio + (1 - eficiencia);
          
          if (ajuste < mejorAjuste) {
            mejorAjuste = ajuste;
            mejorLayout = {
              columnas: columnas,
              filas: filas,
              anchoTarjeta: anchoTarjeta,
              altoTarjeta: altoTarjeta
            };
          }
        }
      }
      
      // Si no encontramos un buen layout, usar el más conservador que quepa
      if (mejorLayout.columnas === 1 && mejorLayout.filas === 1) {
        // Calcular el máximo de columnas que quepan
        let columnasMax = Math.floor((anchoContenedor + gap) / 200); // Mínimo 200px por tarjeta
        columnasMax = Math.min(columnasMax, cantidad);
        columnasMax = Math.max(1, columnasMax);
        
        const filasMax = Math.ceil(cantidad / columnasMax);
        mejorLayout = {
          columnas: columnasMax,
          filas: filasMax,
          anchoTarjeta: (anchoContenedor - (gap * (columnasMax - 1))) / columnasMax,
          altoTarjeta: (altoContenedor - (gap * (filasMax - 1))) / filasMax
        };
      }

      // Caso especial: 5 comandas. Evitar 4+1 (una tarjeta sola abajo); usar 3+2 para que quede cuadrado
      if (cantidad === 5 && mejorLayout.columnas === 4) {
        const col3 = 3;
        const fil2 = 2;
        const ancho3 = (anchoContenedor - (gap * (col3 - 1))) / col3;
        const alto2 = (altoContenedor - (gap * (fil2 - 1))) / fil2;
        if (ancho3 >= 150 && alto2 >= 100) {
          mejorLayout = {
            columnas: col3,
            filas: fil2,
            anchoTarjeta: ancho3,
            altoTarjeta: alto2
          };
        }
      }
      
      // Aplicar el grid con el layout calculado
      contenedorPendientes.style.gridTemplateColumns = `repeat(${mejorLayout.columnas}, 1fr)`;
      contenedorPendientes.style.gridTemplateRows = `repeat(${mejorLayout.filas}, 1fr)`;
      contenedorPendientes.style.gap = `${gap}px`;
      
      // Aplicar tamaño a las tarjetas usando estilos inline
      const tarjetas = document.querySelectorAll('#pedidosPendientes .pedido-card');
      tarjetas.forEach(tarjeta => {
        tarjeta.style.width = '100%';
        tarjeta.style.height = '100%';
        tarjeta.style.maxWidth = '100%';
        tarjeta.style.maxHeight = '100%';
        tarjeta.style.minHeight = '0';
        tarjeta.style.minWidth = '0';
      });
      
      // Determinar clase de tamaño basado en el tamaño de la tarjeta
      let claseTamano = '';
      if (mejorLayout.anchoTarjeta < 250 || mejorLayout.altoTarjeta < 200) {
        claseTamano = 'tamano-pequeno';
      } else if (mejorLayout.anchoTarjeta < 350 || mejorLayout.altoTarjeta < 300) {
        claseTamano = 'tamano-mediano';
      }
      
      tarjetas.forEach(tarjeta => {
        tarjeta.classList.remove('tamano-pequeno', 'tamano-mediano');
        if (claseTamano) {
          tarjeta.classList.add(claseTamano);
        }
      });
      
      console.log('🔍 Grid ajustado (sin scroll):', { 
        cantidad, 
        columnas: mejorLayout.columnas,
        filas: mejorLayout.filas,
        anchoTarjeta: `${Math.round(mejorLayout.anchoTarjeta)}px`,
        altoTarjeta: `${Math.round(mejorLayout.altoTarjeta)}px`,
        claseTamano: claseTamano || 'grande'
      });
    }


    // Función para actualizar la vista
    function actualizarVista() {
      const pedidosPend = obtenerPedidosPendientes();
      
      const contenedorPendientes = document.getElementById('pedidosPendientes');
      const sinPedidos = document.getElementById('sinPedidos');
      const contador = document.getElementById('contadorNumero');

      // Actualizar contador
      contador.textContent = pedidosPend.length;

      // Limitar a 16 pedidos máximo
      const pedidosAMostrar = pedidosPend.slice(0, 16);

      // Renderizar pedidos pendientes primero
      if (pedidosAMostrar.length > 0) {
        contenedorPendientes.innerHTML = pedidosAMostrar.map(p => renderizarPedido(p, false, pedidosAMostrar.length)).join('');
        sinPedidos.style.display = 'none';
        
        // Ajustar grid después de renderizar (para que el contenedor tenga dimensiones correctas)
        requestAnimationFrame(() => {
          ajustarGrid(pedidosPend.length);
        });
      } else {
        contenedorPendientes.innerHTML = '';
        sinPedidos.style.display = 'block';
      }

      // Detectar nuevos pedidos y reproducir sonido
      if (detectarNuevosPedidos(pedidosPend)) {
        reproducirSonido();
      }
    }

    // Función para inicializar
    function inicializar() {
      // Desbloquear sonido al primer clic o toque (los navegadores exigen interacción del usuario)
      document.addEventListener('click', desbloquearAudio, { once: true });
      document.addEventListener('touchstart', desbloquearAudio, { once: true });
      document.addEventListener('keydown', desbloquearAudio, { once: true });

      // Obtener el último ID visto
      const pedidos = obtenerPedidosPendientes();
      if (pedidos.length > 0) {
        ultimoIdVisto = Math.max(...pedidos.map(p => p.id));
      }

      // Actualizar vista inicial
      actualizarVista();
      
      // Función auxiliar para obtener hash de pedidos listos
      function obtenerHashPedidosListos(pedidosListos) {
        if (pedidosListos.length > 0 && typeof pedidosListos[0] === 'number') {
          return JSON.stringify([...pedidosListos].sort((a, b) => a - b));
        }
        const ids = pedidosListos.map(p => p.id).sort((a, b) => a - b);
        return JSON.stringify(ids);
      }
      
      // Inicializar hash de pedidos listos para el polling
      try {
        const pedidosListosStr = localStorage.getItem('pedidosCocinaListos') || '[]';
        const pedidosListosArray = JSON.parse(pedidosListosStr);
        ultimoPedidosListosHash = obtenerHashPedidosListos(pedidosListosArray);
        console.log('✅ Hash inicial de pedidos listos:', ultimoPedidosListosHash);
      } catch (e) {
        ultimoPedidosListosHash = '';
        console.error('Error al inicializar hash de pedidos listos:', e);
      }
      
      // Inicializar hash de historial
      try {
        const historialStr = localStorage.getItem('historialCocina') || '[]';
        const historialArray = JSON.parse(historialStr);
        ultimoHistorialCocinaHash = historialArray.length + '-' + (historialArray[historialArray.length - 1]?.id || 0);
        console.log('✅ Hash inicial de historial:', ultimoHistorialCocinaHash);
      } catch (e) {
        ultimoHistorialCocinaHash = '';
        console.error('Error al inicializar hash de historial:', e);
      }

      // Función para actualizar el intervalo
      function actualizarIntervalo() {
        const intervaloConfig = localStorage.getItem('cocinaIntervaloActualizacion');
        console.log('🔍 DEBUG actualizarIntervalo - Valor leído:', intervaloConfig);
        
        let intervaloNum = 30; // Valor por defecto: 30 segundos
        if (intervaloConfig) {
          const parsed = parseInt(intervaloConfig, 10);
          if (!isNaN(parsed) && parsed >= 1 && parsed <= 60) {
            intervaloNum = parsed;
          } else {
            console.warn('⚠️ Valor de intervalo inválido:', intervaloConfig, 'usando 30 por defecto');
          }
        } else {
          console.warn('⚠️ No se encontró intervalo en localStorage, usando 30 por defecto');
        }
        
        const nuevoIntervalo = intervaloNum * 1000;
        
        if (intervaloActualizacion) {
          clearInterval(intervaloActualizacion);
        }
        
        intervaloActualizacion = setInterval(actualizarVista, nuevoIntervalo);
        console.log('✅ Intervalo de actualización cambiado a:', intervaloNum, 'segundos (', nuevoIntervalo, 'ms)');
      }
      
      // Escuchar cambios en localStorage (para otras ventanas/pestañas)
      window.addEventListener('storage', (e) => {
        if (e.key === 'historialCocina' || e.key === 'pedidosCocinaListos') {
          console.log('📢 Evento storage detectado:', e.key);
          actualizarVista();
        }
        if (e.key === 'cocinaIntervaloActualizacion') {
          actualizarIntervalo();
        }
      });
      
      // Ajustar grid cuando cambia el tamaño de la ventana (responsive)
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const pedidosPend = obtenerPedidosPendientes();
          ajustarGrid(pedidosPend.length);
        }, 250);
      });
      
      // Variable para polling de intervalo
      let ultimoIntervalo = localStorage.getItem('cocinaIntervaloActualizacion');
      
      // Función para obtener hash de pedidos listos (para comparar cambios)
      function obtenerHashPedidosListos(pedidosListos) {
        // Si es array de números (estructura antigua), convertir a string ordenado
        if (pedidosListos.length > 0 && typeof pedidosListos[0] === 'number') {
          return JSON.stringify([...pedidosListos].sort((a, b) => a - b));
        }
        // Si es array de objetos (nueva estructura), usar IDs ordenados
        const ids = pedidosListos.map(p => p.id).sort((a, b) => a - b);
        return JSON.stringify(ids);
      }
      
      // Polling para detectar cambios en pedidos listos e historial
      setInterval(() => {
        try {
          // Verificar cambios en pedidos listos (comparar arrays, no strings)
          const pedidosListosStr = localStorage.getItem('pedidosCocinaListos') || '[]';
          const pedidosListosArray = JSON.parse(pedidosListosStr);
          const pedidosListosHash = obtenerHashPedidosListos(pedidosListosArray);
          
          if (pedidosListosHash !== ultimoPedidosListosHash) {
            console.log('📢 Cambio detectado en pedidosCocinaListos. Nuevos IDs:', pedidosListosArray);
            ultimoPedidosListosHash = pedidosListosHash;
            actualizarVista();
          }
          
          // Verificar cambios en historial de cocina (comparar por longitud y último ID)
          const historialStr = localStorage.getItem('historialCocina') || '[]';
          const historialArray = JSON.parse(historialStr);
          const historialHash = historialArray.length + '-' + (historialArray[historialArray.length - 1]?.id || 0);
          
          if (historialHash !== ultimoHistorialCocinaHash) {
            console.log('📢 Cambio detectado en historialCocina. Nuevos pedidos:', historialArray.length);
            ultimoHistorialCocinaHash = historialHash;
            actualizarVista();
          }
          
          // Verificar cambios en intervalo
          const intervaloActual = localStorage.getItem('cocinaIntervaloActualizacion');
          if (intervaloActual !== ultimoIntervalo) {
            ultimoIntervalo = intervaloActual;
            actualizarIntervalo();
          }
        } catch (e) {
          console.error('Error en polling de cambios:', e);
        }
      }, 1000); // Verificar cada segundo

      // Escuchar eventos personalizados (para cambios en la misma ventana)
      window.addEventListener('pedidoMarcadoListo', (e) => {
        actualizarVista();
      });

      // Obtener intervalo configurado (por defecto 30 segundos)
      const intervaloConfig = localStorage.getItem('cocinaIntervaloActualizacion');
      console.log('🔍 DEBUG - Valor leído de localStorage:', intervaloConfig);
      console.log('🔍 DEBUG - Tipo de valor:', typeof intervaloConfig);
      
      let intervaloNum = 30; // Valor por defecto: 30 segundos
      if (intervaloConfig) {
        const parsed = parseInt(intervaloConfig, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 60) {
          intervaloNum = parsed;
        } else {
          console.warn('⚠️ Valor de intervalo inválido:', intervaloConfig, 'usando 30 por defecto');
        }
      } else {
        console.warn('⚠️ No se encontró intervalo en localStorage, usando 30 por defecto');
      }
      
      const intervaloMs = intervaloNum * 1000;
      intervaloActualizacion = setInterval(actualizarVista, intervaloMs);
      console.log('✅ Intervalo de actualización inicializado a:', intervaloNum, 'segundos (', intervaloMs, 'ms)');
    }

    // Inicializar cuando la página cargue
    document.addEventListener('DOMContentLoaded', inicializar);

    // Intentar entrar en pantalla completa automáticamente
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (document.documentElement.requestFullscreen) {
          // No forzar pantalla completa automáticamente, pero permitir F11
          console.log('Pantalla completa disponible (presiona F11)');
        }
      }, 1000);
    });
