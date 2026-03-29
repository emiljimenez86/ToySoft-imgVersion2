// Sistema de Ayuda Contextual con F1
// Archivo: ayuda.js

// Mapeo de ayuda contextual por página y contexto
const ayudaContextual = {
    'index.html': {
        titulo: 'Página Principal',
        contenido: `
            <div class="help-content">
                <h4><i class="fas fa-home text-info"></i> Bienvenido al Sistema POS</h4>
                <div class="alert alert-info">
                    <strong>¿Qué puedes hacer aquí?</strong>
                    <ul class="mb-0 mt-2">
                        <li><strong>Punto de Venta:</strong> Gestionar ventas, mesas y pedidos</li>
                        <li><strong>Administración:</strong> Configurar productos, clientes y reportes</li>
                        <li><strong>Inventario:</strong> Controlar stock y materias primas</li>
                    </ul>
                </div>
                
                <h5 class="mt-4">Acceso Rápido:</h5>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card bg-dark border-info">
                            <div class="card-body text-center">
                                <i class="fas fa-cash-register fa-2x text-info mb-2"></i>
                                <h6>Punto de Venta</h6>
                                <small>Ventas, mesas, domicilios</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card bg-dark border-warning">
                            <div class="card-body text-center">
                                <i class="fas fa-cog fa-2x text-warning mb-2"></i>
                                <h6>Administración</h6>
                                <small>Configuración y reportes</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card bg-dark border-success">
                            <div class="card-body text-center">
                                <i class="fas fa-boxes fa-2x text-success mb-2"></i>
                                <h6>Inventario</h6>
                                <small>Stock y materias primas</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    
    'POS.html': {
        titulo: 'Punto de Venta',
        contenido: `
            <div class="help-content">
                <h4><i class="fas fa-cash-register text-info"></i> Punto de Venta - Guía Completa</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="text-warning">📋 Gestión de Mesas Activas</h5>
                        <ul>
                            <li><strong>Nueva Mesa:</strong> Ingresa el número y presiona "Nueva Mesa"</li>
                            <li><strong>Mesas Activas:</strong> Solo aparecen las mesas con pedidos pendientes</li>
                            <li><strong>Seleccionar Mesa:</strong> Haz clic en cualquier mesa activa para ver su orden</li>
                            <li><strong>Colores de Mesas:</strong>
                                <ul>
                                    <li>🟠 <strong>Naranja:</strong> Mesas normales con pedidos</li>
                                    <li>🟢 <strong>Verde:</strong> Pedidos a domicilio (D1, D2...)</li>
                                    <li>🔵 <strong>Azul:</strong> Pedidos para recoger (R1, R2...)</li>
                                    <li>🟠 <strong>Naranja intenso:</strong> Mesa seleccionada actualmente</li>
                                </ul>
                            </li>
                        </ul>
                        
                        <h5 class="text-success">🚚 Pedidos Especiales</h5>
                        <ul>
                            <li><strong>Domicilio:</strong> Para entregas a domicilio con cliente</li>
                            <li><strong>Recoger:</strong> Para pedidos para llevar con cliente</li>
                            <li><strong>Cliente Nuevo:</strong> Se puede crear al momento</li>
                            <li><strong>Desaparición:</strong> Los pedidos desaparecen al generar el recibo final</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="text-primary">🛒 Agregar Productos</h5>
                        <ul>
                            <li><strong>Categorías:</strong> Filtra productos por tipo (se crean en Administración)</li>
                            <li><strong>Productos:</strong> Se crean en Administración, preferiblemente en MAYÚSCULAS</li>
                            <li><strong>Agregar:</strong> Haz clic en el producto</li>
                            <li><strong>Cantidad:</strong> Se puede modificar en la orden</li>
                            <li><strong>Detalles:</strong> Agregar notas especiales</li>
                        </ul>
                        
                        <h5 class="text-info">💰 Procesar Venta</h5>
                        <ul>
                            <li><strong>Propina:</strong> Porcentaje automático</li>
                            <li><strong>Descuento:</strong> Monto fijo en pesos</li>
                            <li><strong>Domicilio:</strong> Costo de entrega</li>
                            <li><strong>Métodos de Pago:</strong> Efectivo, tarjeta, transferencia</li>
                        </ul>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-12">
                        <h5 class="text-success">⚡ Venta Rápida</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="text-warning">🚀 Características Principales</h6>
                                <ul>
                                    <li><strong>Vista Lateral:</strong> Productos agregados y controles en el lado derecho</li>
                                    <li><strong>Sin Scroll:</strong> No necesitas bajar para ver la orden actual</li>
                                    <li><strong>Contador en Vivo:</strong> Ve cuántos productos has agregado</li>
                                    <li><strong>Total Dinámico:</strong> Se actualiza automáticamente</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <h6 class="text-primary">🎯 Cómo Usar</h6>
                                <ul>
                                    <li><strong>1. Abrir Modal:</strong> Haz clic en "Venta Rápida"</li>
                                    <li><strong>2. Seleccionar:</strong> Elige categoría y productos</li>
                                    <li><strong>3. Ver Orden:</strong> Revisa en el panel derecho</li>
                                    <li><strong>4. Procesar:</strong> "Procesar Venta" o "Limpiar Orden"</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <h6 class="text-info">📱 Panel de Control</h6>
                                <ul>
                                    <li><strong>Contador:</strong> Número de productos agregados</li>
                                    <li><strong>Lista de Productos:</strong> Vista detallada de la orden</li>
                                    <li><strong>Total:</strong> Monto total de la venta</li>
                                    <li><strong>Botones de Acción:</strong> Procesar o limpiar</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <h6 class="text-warning">⚙️ Funciones Disponibles</h6>
                                <ul>
                                    <li><strong>Procesar Venta:</strong> Generar recibo y cobrar</li>
                                    <li><strong>Limpiar Orden:</strong> Reiniciar la venta</li>
                                    <li><strong>Ayuda:</strong> Guía específica del módulo</li>
                                    <li><strong>Cancelar:</strong> Cerrar sin procesar</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="alert alert-warning mt-3">
                    <strong>💡 Consejos:</strong>
                    <ul class="mb-0 mt-2">
                        <li>Usa "Enviar a Cocina" para pedidos que requieren preparación</li>
                        <li>El "Recibo Preliminar" te permite revisar antes de cobrar</li>
                        <li>Los clientes se guardan automáticamente para futuras ventas</li>
                        <li>Al generar el recibo final, la mesa/pedido se elimina automáticamente</li>
                        <li>Las mesas solo aparecen cuando tienen productos agregados</li>
                        <li><strong>⚡ Venta Rápida:</strong> Ideal para ventas directas sin mesa, con vista lateral de la orden</li>
                        <li><strong>📱 Panel Lateral:</strong> En venta rápida, el panel derecho muestra la orden en tiempo real</li>
                        <li><strong>📝 Configuración:</strong> Las categorías y productos se crean en Administración</li>
                        <li><strong>📝 Nomenclatura:</strong> Los productos deben estar en MAYÚSCULAS para mejor visibilidad</li>
                    </ul>
                </div>
            </div>
        `
    },
    
    'inventario.html': {
        titulo: 'Gestión de Inventario',
        contenido: `
            <div class="help-content">
                <h4><i class="fas fa-boxes text-success"></i> Inventario - Control de Stock</h4>
                
                <div class="alert alert-warning">
                    <strong>📋 Tipos de Productos:</strong>
                    <ul class="mb-0 mt-2">
                        <li><strong>Productos Principales:</strong> Se crean en Administración/POS y se sincronizan automáticamente</li>
                        <li><strong>Componentes / Materia Prima:</strong> Se crean desde el botón "+Ingrediente/Insumo" y se asocian a uno o varios productos del POS (un mismo componente puede usarse en muchos productos)</li>
                    </ul>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="text-warning">📦 Productos Principales</h5>
                        <ul>
                            <li><strong>Origen:</strong> Se crean en Administración/POS</li>
                            <li><strong>Sincronización:</strong> Aparecen automáticamente en "Productos del POS"</li>
                            <li><strong>Tarjetas Verdes:</strong> Productos ya en inventario</li>
                            <li><strong>Tarjetas Amarillas:</strong> Productos faltantes</li>
                            <li><strong>Agregar Individual:</strong> Un producto a la vez</li>
                            <li><strong>Agregar Masivo:</strong> Todos los faltantes de una vez</li>
                            <li><strong>Descuento Automático:</strong> Se descuentan al vender</li>
                        </ul>
                        
                        <h5 class="text-info">🔧 Componentes / Materia Prima</h5>
                        <ul>
                            <li><strong>Creación:</strong> Botón "+Ingrediente/Insumo" (solo componentes)</li>
                            <li><strong>Asociación:</strong> Elige los productos del POS que llevan este componente (selección múltiple: Ctrl o Cmd + clic)</li>
                            <li><strong>Ejemplo:</strong> Empaques J1 → Café, Té, Jugo (un solo ítem en inventario; se descuenta al vender cualquiera)</li>
                            <li><strong>Descuento Automático:</strong> Se descuentan cuando se vende cualquiera de los productos que lo llevan</li>
                            <li><strong>Visualización:</strong> Aparecen en gris en la tabla; debajo del nombre se muestra "Usado en: Producto A, Producto B..."</li>
                            <li><strong>Cantidad por Unidad:</strong> Para gramos, litros, etc. (ej: 10g por café)</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="text-success">🔄 Sincronización y Descuentos</h5>
                        <ul>
                            <li><strong>Productos Principales:</strong> Se descuentan directamente al vender</li>
                            <li><strong>Componentes:</strong> Se descuentan automáticamente cuando se vende cualquiera de los productos asociados</li>
                            <li><strong>Unidades:</strong> Productos por unidad se descuentan 1:1</li>
                            <li><strong>Gramos/Litros:</strong> Usan "Cantidad por Unidad" para calcular descuentos</li>
                            <li><strong>Verificación:</strong> Stock antes de agregar</li>
                            <li><strong>Alertas:</strong> Stock insuficiente en tiempo real</li>
                        </ul>
                        
                        <h5 class="text-primary">⚙️ Gestión</h5>
                        <ul>
                            <li><strong>Filtros:</strong> Por categoría, estado, tipo (producto/componente)</li>
                            <li><strong>Editar:</strong> Modificar productos y componentes</li>
                            <li><strong>Ajustar Stock:</strong> Actualizar cantidades manualmente</li>
                            <li><strong>Eliminar:</strong> Quitar del inventario</li>
                            <li><strong>Exportar:</strong> Reportes en Excel</li>
                            <li><strong>Imprimir Tirilla:</strong> Lista general con productos y componentes agrupados</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-success mt-3">
                    <strong>💡 Flujo Recomendado:</strong>
                    <ol class="mb-0 mt-2">
                        <li><strong>Crear Productos:</strong> En Administración/POS (productos principales)</li>
                        <li><strong>Sincronizar:</strong> Refrescar productos del POS en Inventario</li>
                        <li><strong>Agregar al Inventario:</strong> Desde "Productos del POS"</li>
                        <li><strong>Crear Componentes:</strong> Usar "+Ingrediente/Insumo" y elegir los productos del POS que los llevan (puedes seleccionar varios)</li>
                        <li><strong>Configurar Stock:</strong> Establecer cantidades iniciales y límites</li>
                    </ol>
                </div>
                
                <div class="alert alert-info mt-3">
                    <strong>🔗 Integración con POS:</strong>
                    <ul class="mb-0 mt-2">
                        <li>Los productos del POS se sincronizan automáticamente como productos principales</li>
                        <li>El stock se descuenta automáticamente al procesar ventas</li>
                        <li>Los componentes se descuentan cuando se vende cualquiera de los productos que los llevan</li>
                        <li>Las alertas aparecen en tiempo real</li>
                        <li>La tirilla muestra productos principales con sus componentes agrupados (un componente compartido puede aparecer bajo varios productos)</li>
                    </ul>
                </div>
                
                <div class="mt-4">
                    <h5 class="text-primary mb-3"><i class="fas fa-mouse-pointer"></i> Guía de Botones y Funciones</h5>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="text-success">🔘 Botones Principales (Barra Superior)</h6>
                            <div class="card bg-dark border-success mb-3">
                                <div class="card-body">
                                    <ul class="mb-0">
                                        <li><strong><i class="fas fa-plus text-success"></i> Ingrediente / Insumo:</strong><br>
                                            <small>Crea un nuevo componente/materia prima. Elige los productos del POS que lo llevan (selección múltiple con Ctrl o Cmd). Un mismo componente puede usarse en varios productos con un solo stock.</small></li>
                                        <li><strong><i class="fas fa-file-excel text-info"></i> Exportar a Excel:</strong><br>
                                            <small>Genera un archivo Excel con todo el inventario actual, incluyendo productos principales y componentes, con sus stocks y categorías.</small></li>
                                        <li><strong><i class="fas fa-print text-success"></i> Imprimir Tirilla Inventario:</strong><br>
                                            <small>Genera una tirilla de impresión con todos los productos y componentes agrupados. Los componentes aparecen debajo de cada producto que los utiliza.</small></li>
                                        <li><strong><i class="fas fa-refresh text-warning"></i> Refrescar Productos POS:</strong><br>
                                            <small>Actualiza la lista de productos del POS. Úsalo después de crear nuevos productos en Administración para verlos en la sección "Productos del POS".</small></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="text-info">🔘 Botones de Información y Navegación</h6>
                            <div class="card bg-dark border-info mb-3">
                                <div class="card-body">
                                    <ul class="mb-0">
                                        <li><strong><i class="fas fa-chart-line text-secondary"></i> Reporte Movimientos:</strong><br>
                                            <small>Muestra un reporte detallado de todos los movimientos de inventario (entradas y salidas) en un rango de fechas. Permite exportar a Excel.</small></li>
                                        <li><strong><i class="fas fa-info-circle text-info"></i> Info Integración:</strong><br>
                                            <small>Muestra información detallada sobre cómo funciona la integración entre el POS y el Inventario, flujos de trabajo recomendados y configuraciones.</small></li>
                                        <li><strong><i class="fas fa-arrow-left text-light"></i> Volver al POS:</strong><br>
                                            <small>Regresa a la pantalla principal del Punto de Venta.</small></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <h6 class="text-warning">🔘 Filtros de Búsqueda</h6>
                            <div class="card bg-dark border-warning mb-3">
                                <div class="card-body">
                                    <ul class="mb-0">
                                        <li><strong>Buscar producto:</strong><br>
                                            <small>Campo de texto para buscar productos por nombre o código. Busca en tiempo real mientras escribes.</small></li>
                                        <li><strong>Filtro Categoría:</strong><br>
                                            <small>Filtra productos por categoría. Selecciona una categoría específica o "Todas las categorías" para ver todo.</small></li>
                                        <li><strong>Filtro Tipo:</strong><br>
                                            <small>Filtra por tipo: "Productos Principales" o "Componentes / Materia Prima". Útil para separar visualmente.</small></li>
                                        <li><strong>Filtro Estado:</strong><br>
                                            <small>Filtra por estado de stock: "Stock Bajo", "Stock Normal" o "Stock Alto". Ayuda a identificar productos que necesitan reposición.</small></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="text-danger">🔘 Botones de Acción en la Tabla</h6>
                            <div class="card bg-dark border-danger mb-3">
                                <div class="card-body">
                                    <ul class="mb-0">
                                        <li><strong><i class="fas fa-edit text-warning"></i> Editar (Amarillo):</strong><br>
                                            <small>Abre el formulario para editar el producto o componente. Puedes modificar nombre, categoría, stocks, unidad de medida, y para componentes cambiar los productos del POS que lo llevan (selección múltiple).</small></li>
                                        <li><strong><i class="fas fa-boxes text-info"></i> Ajustar Stock (Azul):</strong><br>
                                            <small>Permite ajustar manualmente el stock actual del producto. Útil para correcciones, inventarios físicos o ajustes de pérdidas/ganancias.</small></li>
                                        <li><strong><i class="fas fa-trash text-danger"></i> Eliminar (Rojo):</strong><br>
                                            <small>Elimina el producto o componente del inventario. Se solicita confirmación antes de eliminar. Ten cuidado, esta acción no se puede deshacer.</small></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <h6 class="text-primary">📋 Sección "Productos del POS"</h6>
                            <div class="card bg-dark border-primary mb-3">
                                <div class="card-body">
                                    <p class="mb-2">Esta sección muestra todos los productos creados en Administración/POS:</p>
                                    <ul class="mb-0">
                                        <li><strong>Tarjetas Verdes:</strong> Productos que ya están en el inventario. Muestra el estado "En Inventario".</li>
                                        <li><strong>Tarjetas Amarillas:</strong> Productos que aún no están en el inventario. Muestra el estado "Falta en Inventario".</li>
                                        <li><strong>Botón "Agregar al Inventario":</strong> Solo aparece en productos faltantes. Agrega el producto al inventario con stock inicial en 0.</li>
                                        <li><strong>Filtro "Solo Faltantes":</strong> Muestra únicamente los productos que aún no están en inventario, facilitando la gestión.</li>
                                        <li><strong>Botón "Agregar Productos del POS":</strong> En el modal de información, permite agregar todos los productos faltantes de una vez.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="text-success">🏷️ Indicadores Visuales en la Tabla</h6>
                            <div class="card bg-dark border-success mb-3">
                                <div class="card-body">
                                    <ul class="mb-0">
                                        <li><strong>Filas Grises:</strong> Indican componentes/materia prima. Se muestran separadas de los productos principales.</li>
                                        <li><strong>Badge "Componente":</strong> Aparece en gris junto al estado, identificando componentes.</li>
                                        <li><strong>Badge Rojo "Bajo":</strong> Stock actual está en o por debajo del stock mínimo. Necesita reposición urgente.</li>
                                        <li><strong>Badge Amarillo "Normal":</strong> Stock está entre el mínimo y máximo. Estado saludable.</li>
                                        <li><strong>Badge Verde "Alto":</strong> Stock está cerca o en el máximo. Buen nivel de inventario.</li>
                                        <li><strong>"Usado en: [Producto A, Producto B, ...]":</strong> Texto debajo del nombre del componente que indica en qué productos del POS se utiliza (puede ser uno o varios).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-warning mt-3">
                        <strong>💡 Consejos de Uso:</strong>
                        <ul class="mb-0 mt-2">
                            <li>Usa los filtros para encontrar rápidamente productos específicos o identificar stock bajo</li>
                            <li>Revisa regularmente el "Reporte Movimientos" para llevar un control detallado</li>
                            <li>Exporta a Excel periódicamente para tener respaldos de tu inventario</li>
                            <li>La tirilla de impresión es útil para inventarios físicos o entregas a proveedores</li>
                            <li>Recuerda refrescar productos del POS después de crear nuevos productos en Administración</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
    
    'admon.html': {
        titulo: 'Administración',
        contenido: `
            <div class="help-content">
                <h4><i class="fas fa-cog text-warning"></i> Administración - Configuración del Sistema</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="text-info">👥 Gestión de Clientes</h5>
                        <ul>
                            <li><strong>Agregar Cliente:</strong> Datos completos del cliente</li>
                            <li><strong>Buscar:</strong> Por nombre, documento o teléfono</li>
                            <li><strong>Modificar:</strong> Actualizar información</li>
                            <li><strong>Eliminar:</strong> Quitar clientes seleccionados</li>
                        </ul>
                        
                        <h5 class="text-success">📦 Gestión de Productos</h5>
                        <ul>
                            <li><strong>Agregar Producto:</strong> Nombre, precio, categoría</li>
                            <li><strong>Nomenclatura:</strong> Usar MAYÚSCULAS para mejor visibilidad</li>
                            <li><strong>Categorías:</strong> Organizar productos</li>
                            <li><strong>Precios:</strong> Modificar costos</li>
                            <li><strong>Estado:</strong> Activo/Inactivo</li>
                        </ul>

                        <h5 class="text-primary">🏷️ Gestión de Categorías</h5>
                        <ul>
                            <li><strong>Agregar Categoría:</strong> Crear nuevas categorías</li>
                            <li><strong>Modificar:</strong> Cambiar nombre de categorías</li>
                            <li><strong>Eliminar:</strong> Quitar categorías no usadas</li>
                            <li><strong>Organizar:</strong> Clasificar productos por tipo</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="text-warning">📊 Reportes y Estadísticas</h5>
                        <ul>
                            <li><strong>Ventas:</strong> Por período y método de pago</li>
                            <li><strong>Productos:</strong> Más y menos vendidos</li>
                            <li><strong>Clientes:</strong> Frecuencia de compra</li>
                            <li><strong>Exportar:</strong> Datos a Excel</li>
                        </ul>
                        
                        <h5 class="text-primary">⚙️ Configuración</h5>
                        <ul>
                            <li><strong>Datos del Negocio:</strong> Información empresarial</li>
                            <li><strong>Horarios:</strong> Configurar horarios de cierre</li>
                            <li><strong>Backup y Restauración:</strong> Exportar/Importar datos</li>
                            <li><strong>Seguridad:</strong> Cambiar PIN de acceso</li>
                        </ul>
                        
                        <h5 class="text-success">💾 Backup y Restauración</h5>
                        <ul>
                            <li><strong>Exportar Datos:</strong> Descargar respaldo completo</li>
                            <li><strong>Importar Datos:</strong> Restaurar desde archivo</li>
                            <li><strong>Frecuencia:</strong> Hacer backup regularmente</li>
                            <li><strong>Seguridad:</strong> Guardar en lugar seguro</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-warning mt-3">
                    <strong>⚠️ Importante:</strong>
                    <ul class="mb-0 mt-2">
                        <li>Los cambios en productos afectan inmediatamente al POS</li>
                        <li>Las categorías ayudan a organizar mejor los productos</li>
                        <li><strong>💾 Backup:</strong> Haz respaldos regulares de tus datos</li>
                        <li><strong>🔄 Restauración:</strong> Puedes restaurar datos desde archivos de backup</li>
                        <li>Los reportes se pueden exportar para análisis externos</li>
                        <li><strong>📝 Nomenclatura:</strong> Los productos deben estar en MAYÚSCULAS para mejor visibilidad en el POS</li>
                    </ul>
                </div>
            </div>
        `
    },
    
    'gastos.html': {
        titulo: 'Gestión de Gastos',
        contenido: `
            <div class="help-content">
                <h4><i class="fas fa-receipt text-danger"></i> Gestión de Gastos - Control Financiero</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="text-warning">➕ Registrar Gastos</h5>
                        <ul>
                            <li><strong>Descripción:</strong> Detalle del gasto</li>
                            <li><strong>Monto:</strong> Cantidad en pesos</li>
                            <li><strong>Fecha:</strong> Cuándo ocurrió</li>
                            <li><strong>Categoría:</strong> Tipo de gasto (opcional)</li>
                        </ul>
                        
                        <h5 class="text-info">📋 Gestión de Gastos</h5>
                        <ul>
                            <li><strong>Ver Todos:</strong> Lista completa de gastos</li>
                            <li><strong>Buscar:</strong> Por descripción o fecha</li>
                            <li><strong>Modificar:</strong> Editar gastos existentes</li>
                            <li><strong>Eliminar:</strong> Quitar gastos incorrectos</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="text-success">📊 Reportes</h5>
                        <ul>
                            <li><strong>Gastos Diarios:</strong> Total del día</li>
                            <li><strong>Gastos Mensuales:</strong> Resumen mensual</li>
                            <li><strong>Balance:</strong> Ingresos vs Gastos</li>
                            <li><strong>Exportar:</strong> Datos a Excel</li>
                        </ul>
                        
                        <h5 class="text-primary">🔗 Integración</h5>
                        <ul>
                            <li><strong>Cierre de Caja:</strong> Gastos incluidos automáticamente</li>
                            <li><strong>Balance Final:</strong> Cálculo neto</li>
                            <li><strong>Historial:</strong> Registro permanente</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-info mt-3">
                    <strong>💡 Consejos:</strong>
                    <ul class="mb-0 mt-2">
                        <li>Registra los gastos inmediatamente para mayor precisión</li>
                        <li>Usa descripciones claras para facilitar el análisis</li>
                        <li>Los gastos se incluyen automáticamente en el cierre de caja</li>
                    </ul>
                </div>
            </div>
        `
    },
    
    'historial.html': {
        titulo: 'Historial de Ventas',
        contenido: `
            <div class="help-content">
                <h4><i class="fas fa-history text-primary"></i> Historial de Ventas - Registro Completo</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="text-info">📋 Ver Ventas</h5>
                        <ul>
                            <li><strong>Filtros:</strong> Por fecha, método de pago, cliente</li>
                            <li><strong>Búsqueda:</strong> Por número de factura o cliente</li>
                            <li><strong>Detalles:</strong> Ver productos de cada venta</li>
                            <li><strong>Reimprimir:</strong> Generar factura nuevamente</li>
                        </ul>
                        
                        <h5 class="text-success">📊 Estadísticas</h5>
                        <ul>
                            <li><strong>Ventas Totales:</strong> Por período</li>
                            <li><strong>Métodos de Pago:</strong> Distribución</li>
                            <li><strong>Productos Populares:</strong> Más vendidos</li>
                            <li><strong>Clientes Frecuentes:</strong> Mejores clientes</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="text-warning">🖨️ Impresión</h5>
                        <ul>
                            <li><strong>Factura Individual:</strong> Reimprimir venta específica</li>
                            <li><strong>Reporte de Ventas:</strong> Resumen por período</li>
                            <li><strong>Exportar Excel:</strong> Datos para análisis</li>
                            <li><strong>Configuración:</strong> Formato de impresión</li>
                        </ul>
                        
                        <h5 class="text-primary">🔍 Información Detallada</h5>
                        <ul>
                            <li><strong>Fecha y Hora:</strong> Cuándo se realizó</li>
                            <li><strong>Mesa/Cliente:</strong> A quién se vendió</li>
                            <li><strong>Productos:</strong> Lista completa</li>
                            <li><strong>Totales:</strong> Subtotal, propina, descuento</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-warning mt-3">
                    <strong>📈 Análisis de Datos:</strong>
                    <ul class="mb-0 mt-2">
                        <li>Usa los filtros para analizar tendencias de ventas</li>
                        <li>Identifica productos más y menos populares</li>
                        <li>Monitorea el rendimiento por método de pago</li>
                    </ul>
                </div>
            </div>
        `
    },
    
    'cotizaciones': {
        titulo: 'Gestión de Cotizaciones',
        contenido: `
            <div class="help-content">
                <h4><i class="fas fa-file-invoice text-info"></i> Cotizaciones - Presupuestos y Propuestas</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="text-warning">📝 Crear Cotización</h5>
                        <ul>
                            <li><strong>Cliente:</strong> Seleccionar cliente existente o crear nuevo</li>
                            <li><strong>Fecha:</strong> Fecha de la cotización (por defecto hoy)</li>
                            <li><strong>Productos:</strong> Agregar items desde el catálogo</li>
                            <li><strong>Cantidades:</strong> Especificar cantidades para cada producto</li>
                            <li><strong>Precios:</strong> Se calculan automáticamente</li>
                        </ul>
                        
                        <h5 class="text-success">🛒 Agregar Productos</h5>
                        <ul>
                            <li><strong>Categorías:</strong> Filtrar por tipo de producto</li>
                            <li><strong>Búsqueda:</strong> Buscar productos por nombre</li>
                            <li><strong>Selección:</strong> Hacer clic en el producto deseado</li>
                            <li><strong>Cantidad:</strong> Modificar cantidad en la lista</li>
                            <li><strong>Eliminar:</strong> Quitar productos no deseados</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="text-info">📋 Gestión de Cotizaciones</h5>
                        <ul>
                            <li><strong>Ver Todas:</strong> Lista completa de cotizaciones</li>
                            <li><strong>Buscar:</strong> Por cliente o fecha</li>
                            <li><strong>Editar:</strong> Modificar cotizaciones existentes</li>
                            <li><strong>Eliminar:</strong> Quitar cotizaciones obsoletas</li>
                            <li><strong>Duplicar:</strong> Crear nueva basada en existente</li>
                        </ul>
                        
                        <h5 class="text-primary">🖨️ Impresión y Envío</h5>
                        <ul>
                            <li><strong>Vista Previa:</strong> Revisar antes de imprimir</li>
                            <li><strong>Imprimir:</strong> Generar documento físico</li>
                            <li><strong>PDF:</strong> Exportar como archivo digital</li>
                            <li><strong>Enviar:</strong> Compartir por email o WhatsApp</li>
                            <li><strong>Guardar:</strong> Almacenar para referencia futura</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-info mt-3">
                    <strong>💡 Flujo de Trabajo Recomendado:</strong>
                    <ol class="mb-0 mt-2">
                        <li><strong>Crear Cotización:</strong> Selecciona cliente y fecha</li>
                        <li><strong>Agregar Productos:</strong> Busca y selecciona items</li>
                        <li><strong>Revisar Total:</strong> Verifica cantidades y precios</li>
                        <li><strong>Guardar:</strong> Almacena la cotización</li>
                        <li><strong>Imprimir/Enviar:</strong> Comparte con el cliente</li>
                        <li><strong>Seguimiento:</strong> Convierte a venta cuando se apruebe</li>
                    </ol>
                </div>
                
                <div class="alert alert-warning mt-3">
                    <strong>⚠️ Diferencias con Ventas:</strong>
                    <ul class="mb-0 mt-2">
                        <li><strong>Cotizaciones:</strong> Son propuestas, no ventas reales</li>
                        <li><strong>No afectan inventario:</strong> No descuentan stock</li>
                        <li><strong>Precios estimados:</strong> Pueden cambiar antes de la venta</li>
                        <li><strong>Vigencia:</strong> Tienen fecha de expiración</li>
                        <li><strong>Conversión:</strong> Se pueden convertir a venta cuando se apruebe</li>
                    </ul>
                </div>
                
                <div class="row mt-4">
                    <div class="col-12">
                        <h5 class="text-success">🎯 Beneficios de las Cotizaciones</h5>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card bg-dark border-success">
                                    <div class="card-body text-center">
                                        <i class="fas fa-handshake fa-2x text-success mb-2"></i>
                                        <h6>Profesionalismo</h6>
                                        <small>Presenta propuestas formales</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-dark border-info">
                                    <div class="card-body text-center">
                                        <i class="fas fa-clock fa-2x text-info mb-2"></i>
                                        <h6>Planificación</h6>
                                        <small>Anticipa necesidades</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-dark border-warning">
                                    <div class="card-body text-center">
                                        <i class="fas fa-chart-line fa-2x text-warning mb-2"></i>
                                        <h6>Seguimiento</h6>
                                        <small>Monitorea oportunidades</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    
    'cierre-caja': {
        titulo: 'Cierre de Caja',
        contenido: `
            <div class="help-content">
                <h4><i class="fas fa-calculator text-success"></i> Cierre de Caja - Control Financiero Diario</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="text-info">💰 Resumen de Ventas</h5>
                        <ul>
                            <li><strong>Total Ventas:</strong> Suma de todas las ventas del día</li>
                            <li><strong>Efectivo:</strong> Ventas pagadas en efectivo</li>
                            <li><strong>Transferencia:</strong> Ventas pagadas por transferencia</li>
                            <li><strong>Tarjeta:</strong> Ventas pagadas con tarjeta</li>
                            <li><strong>Crédito:</strong> Ventas a crédito pendientes</li>
                        </ul>
                        
                        <h5 class="text-warning">📊 Balance Final</h5>
                        <ul>
                            <li><strong>Cálculo:</strong> Ventas - Gastos = Balance</li>
                            <li><strong>Base Caja:</strong> Dinero inicial para el siguiente día</li>
                            <li><strong>Verificación:</strong> Confirmar que los totales coincidan</li>
                            <li><strong>Documentación:</strong> Guardar registro del cierre</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="text-danger">💸 Gestión de Gastos</h5>
                        <ul>
                            <li><strong>Registrar Gastos:</strong> Todos los gastos del día</li>
                            <li><strong>Categorías:</strong> Organizar por tipo de gasto</li>
                            <li><strong>Total Gastos:</strong> Suma automática</li>
                            <li><strong>Incluir en Balance:</strong> Se descuentan automáticamente</li>
                            <li><strong>Historial:</strong> Registro permanente de gastos</li>
                        </ul>
                        
                        <h5 class="text-primary">👥 Información del Cierre</h5>
                        <ul>
                            <li><strong>Quien Cierra:</strong> Nombre de quien realiza el cierre</li>
                            <li><strong>Quien Recibe:</strong> Nombre de quien recibe la caja</li>
                            <li><strong>Monto Base:</strong> Dinero para el siguiente día</li>
                            <li><strong>Detalles:</strong> Observaciones adicionales</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-success mt-3">
                    <strong>💡 Proceso de Cierre Recomendado:</strong>
                    <ol class="mb-0 mt-2">
                        <li><strong>Revisar Ventas:</strong> Verificar totales por método de pago</li>
                        <li><strong>Registrar Gastos:</strong> Incluir todos los gastos del día</li>
                        <li><strong>Calcular Balance:</strong> Ventas - Gastos</li>
                        <li><strong>Verificar Créditos:</strong> Revisar ventas pendientes</li>
                        <li><strong>Completar Información:</strong> Nombres y monto base</li>
                        <li><strong>Guardar e Imprimir:</strong> Documentar el cierre</li>
                    </ol>
                </div>
                
                <div class="alert alert-warning mt-3">
                    <strong>⚠️ Importante:</strong>
                    <ul class="mb-0 mt-2">
                        <li><strong>Frecuencia:</strong> Realizar cierre al final de cada día</li>
                        <li><strong>Precisión:</strong> Verificar que los totales sean correctos</li>
                        <li><strong>Documentación:</strong> Guardar copia impresa del cierre</li>
                        <li><strong>Base Caja:</strong> Dejar dinero suficiente para el siguiente día</li>
                        <li><strong>Créditos:</strong> Mantener registro de ventas pendientes</li>
                    </ul>
                </div>
                
                <div class="row mt-4">
                    <div class="col-12">
                        <h5 class="text-info">🎯 Beneficios del Cierre de Caja</h5>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card bg-dark border-success">
                                    <div class="card-body text-center">
                                        <i class="fas fa-chart-bar fa-2x text-success mb-2"></i>
                                        <h6>Control Financiero</h6>
                                        <small>Monitoreo diario de ingresos</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-dark border-warning">
                                    <div class="card-body text-center">
                                        <i class="fas fa-shield-alt fa-2x text-warning mb-2"></i>
                                        <h6>Seguridad</h6>
                                        <small>Control de efectivo</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-dark border-info">
                                    <div class="card-body text-center">
                                        <i class="fas fa-file-alt fa-2x text-info mb-2"></i>
                                        <h6>Documentación</h6>
                                        <small>Registro histórico</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    
    'cierre-operativo': {
        titulo: 'Cierre Operativo',
        contenido: `
            <div class="help-content">
                <h4><i class="fas fa-user-clock text-success"></i> Cierre Operativo - Control de Turnos</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="text-info">👤 Información del Empleado</h5>
                        <ul>
                            <li><strong>Nombre:</strong> Nombre completo del empleado</li>
                            <li><strong>Cargo:</strong> Función específica en el negocio</li>
                            <li><strong>Horario:</strong> Hora de inicio y fin del turno</li>
                            <li><strong>Responsabilidad:</strong> Áreas bajo su cuidado</li>
                        </ul>
                        
                        <h5 class="text-warning">✅ Checklist de Cierre</h5>
                        <ul>
                            <li><strong>Limpieza:</strong> Área de trabajo limpia y ordenada</li>
                            <li><strong>Inventario:</strong> Verificación de productos disponibles</li>
                            <li><strong>Equipos:</strong> Apagado correcto de máquinas</li>
                            <li><strong>Seguridad:</strong> Verificación de puertas y alarmas</li>
                            <li><strong>Mesas:</strong> Organización y limpieza de mesas</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="text-danger">📝 Documentación del Turno</h5>
                        <ul>
                            <li><strong>Observaciones:</strong> Incidentes o eventos importantes</li>
                            <li><strong>Tareas Pendientes:</strong> Trabajos para el siguiente turno</li>
                            <li><strong>Problemas:</strong> Reportar cualquier inconveniente</li>
                            <li><strong>Sugerencias:</strong> Mejoras para el proceso</li>
                        </ul>
                        
                        <h5 class="text-success">💰 Totales de Ventas (Opcional)</h5>
                        <ul>
                            <li><strong>Ingreso Manual:</strong> El empleado puede registrar totales de ventas</li>
                            <li><strong>Efectivo:</strong> Total de ventas en efectivo del turno</li>
                            <li><strong>Transferencia:</strong> Total de ventas por transferencia</li>
                            <li><strong>Tarjeta:</strong> Total de ventas con tarjeta</li>
                            <li><strong>Cálculo Automático:</strong> El total general se calcula automáticamente</li>
                        </ul>
                        
                        <h5 class="text-primary">🎯 Propósito del Cierre Operativo</h5>
                        <ul>
                            <li><strong>Totales Manuales:</strong> El empleado puede ingresar totales de ventas si lo desea</li>
                            <li><strong>Control Operativo:</strong> Gestión de tareas y responsabilidades</li>
                            <li><strong>Comunicación:</strong> Información para el siguiente turno</li>
                            <li><strong>Responsabilidad:</strong> Verificación de cumplimiento</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-success mt-3">
                    <strong>💡 Proceso de Cierre Operativo:</strong>
                    <ol class="mb-0 mt-2">
                        <li><strong>Completar Checklist:</strong> Verificar todas las tareas</li>
                        <li><strong>Registrar Información:</strong> Datos del empleado y horario</li>
                        <li><strong>Documentar Observaciones:</strong> Notas importantes del turno</li>
                        <li><strong>Listar Pendientes:</strong> Tareas para el siguiente turno</li>
                        <li><strong>Guardar e Imprimir:</strong> Documentar el cierre operativo</li>
                    </ol>
                </div>
                
                <div class="alert alert-warning mt-3">
                    <strong>⚠️ Diferencias con Cierre de Caja:</strong>
                    <ul class="mb-0 mt-2">
                        <li><strong>Totales Manuales:</strong> El empleado ingresa los totales si lo desea</li>
                        <li><strong>Enfoque Operativo:</strong> Control de tareas y responsabilidades</li>
                        <li><strong>Para Empleados:</strong> Uso diario de personal operativo</li>
                        <li><strong>Checklist:</strong> Verificación de cumplimiento de tareas</li>
                        <li><strong>Comunicación:</strong> Información entre turnos</li>
                    </ul>
                </div>
                
                <div class="row mt-4">
                    <div class="col-12">
                        <h5 class="text-info">🎯 Beneficios del Cierre Operativo</h5>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card bg-dark border-success">
                                    <div class="card-body text-center">
                                        <i class="fas fa-clipboard-check fa-2x text-success mb-2"></i>
                                        <h6>Control de Tareas</h6>
                                        <small>Verificación de cumplimiento</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-dark border-warning">
                                    <div class="card-body text-center">
                                        <i class="fas fa-users fa-2x text-warning mb-2"></i>
                                        <h6>Comunicación</h6>
                                        <small>Información entre turnos</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-dark border-info">
                                    <div class="card-body text-center">
                                        <i class="fas fa-file-alt fa-2x text-info mb-2"></i>
                                        <h6>Documentación</h6>
                                        <small>Registro de responsabilidades</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};

// Función para mostrar ayuda contextual
function mostrarAyudaContextual() {
    const contexto = obtenerContextoActual();
    let ayuda;
    
    // Detectar si estamos en cotizaciones desde el POS
    if (contexto.pagina === 'POS.html' && contexto.modulo === 'cotizaciones') {
        // Verificar si estamos en el modal de nueva cotización específicamente
        if (document.getElementById('modalNuevaCotizacion') && 
            document.getElementById('modalNuevaCotizacion').classList.contains('show')) {
            ayuda = {
                titulo: 'Nueva Cotización - Ayuda Completa',
                contenido: ayudaContextual['cotizaciones'].contenido + `
                    <div class="alert alert-warning mt-3">
                        <strong>💡 Ayuda Específica:</strong>
                        <ul class="mb-0 mt-2">
                            <li>Haz clic en los botones de ayuda (❓) en cada sección para ayuda específica</li>
                            <li>Usa F1 desde cualquier parte del modal para esta ayuda general</li>
                            <li>Los productos se pueden buscar por categoría o nombre</li>
                            <li>Las cantidades y precios se pueden modificar antes de agregar</li>
                        </ul>
                    </div>
                `
            };
        } else {
            ayuda = ayudaContextual['cotizaciones'];
        }
    } else if (contexto.pagina === 'POS.html' && contexto.modulo === 'cierre-caja') {
        ayuda = ayudaContextual['cierre-caja'];
    } else if (contexto.pagina === 'POS.html' && contexto.modulo === 'cierre-operativo') {
        ayuda = ayudaContextual['cierre-operativo'];
    } else {
        ayuda = ayudaContextual[contexto.pagina] || ayudaContextual['index.html'];
    }
    
    // Actualizar contenido del modal
    document.getElementById('tituloAyuda').textContent = ayuda.titulo;
    document.getElementById('contenidoAyuda').innerHTML = ayuda.contenido;
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('modalAyuda'));
    modal.show();
}

// Función para obtener el contexto actual
function obtenerContextoActual() {
    const url = window.location.pathname.split('/').pop() || 'index.html';
    return {
        pagina: url,
        modulo: detectarModulo(),
        elementoActivo: document.querySelector('.active, .selected')?.id || null
    };
}

// Función para detectar el módulo actual
function detectarModulo() {
    const url = window.location.pathname;
    if (url.includes('POS.html')) return 'pos';
    if (url.includes('inventario.html')) return 'inventario';
    if (url.includes('admon.html')) return 'administracion';
    if (url.includes('gastos.html')) return 'gastos';
    if (url.includes('historial.html')) return 'historial';
    
    // Detectar si estamos en el modal de cotizaciones
    if (document.getElementById('modalCotizaciones') && 
        document.getElementById('modalCotizaciones').classList.contains('show')) {
        return 'cotizaciones';
    }
    
    // Detectar si estamos en el modal de nueva cotización
    if (document.getElementById('modalNuevaCotizacion') && 
        document.getElementById('modalNuevaCotizacion').classList.contains('show')) {
        return 'cotizaciones';
    }
    
    // Detectar si estamos en el modal de cierre de caja
    if (document.getElementById('modalCierreDiario') && 
        document.getElementById('modalCierreDiario').classList.contains('show')) {
        return 'cierre-caja';
    }
    
    // Detectar si estamos en el modal de cierre operativo
    if (document.getElementById('modalCierreOperativo') && 
        document.getElementById('modalCierreOperativo').classList.contains('show')) {
        return 'cierre-operativo';
    }
    
    return 'principal';
}

// Event listener para F1
document.addEventListener('keydown', function(event) {
    if (event.key === 'F1') {
        event.preventDefault();
        mostrarAyudaContextual();
    }
});

// Función para inicializar botones de ayuda
function inicializarBotonesAyuda() {
    // Agregar botones de ayuda a elementos específicos
    const elementosAyuda = document.querySelectorAll('[data-ayuda]');
    elementosAyuda.forEach(elemento => {
        elemento.addEventListener('click', function() {
            const ayudaEspecifica = this.getAttribute('data-ayuda');
            mostrarAyudaEspecifica(ayudaEspecifica);
        });
    });
}

// Función para mostrar ayuda específica de un elemento
function mostrarAyudaEspecifica(tipo) {
    const ayudasEspecificas = {
        'mesas': {
            titulo: 'Gestión de Mesas',
            contenido: `
                <div class="alert alert-info">
                    <h6><i class="fas fa-table"></i> Gestión de Mesas y Pedidos</h6>
                    <ul class="mb-0">
                        <li><strong>Nueva Mesa:</strong> Ingresa el número y presiona "Nueva Mesa"</li>
                        <li><strong>Mesas Activas:</strong> Solo aparecen las mesas con pedidos</li>
                        <li><strong>Colores:</strong> Naranja (normal), Verde (domicilio), Azul (recoger)</li>
                        <li><strong>Seleccionar:</strong> Haz clic en cualquier mesa para ver su orden</li>
                    </ul>
                </div>
            `
        },
        'productos': {
            titulo: 'Gestión de Productos',
            contenido: `
                <div class="alert alert-success">
                    <h6><i class="fas fa-box"></i> Agregar y Gestionar Productos</h6>
                    <ul class="mb-0">
                        <li><strong>Categorías:</strong> Filtra productos por tipo</li>
                        <li><strong>Productos:</strong> Se crean en Administración</li>
                        <li><strong>Agregar:</strong> Haz clic en el producto</li>
                        <li><strong>Cantidad:</strong> Se puede modificar en la orden</li>
                        <li><strong>Detalles:</strong> Agregar notas especiales</li>
                    </ul>
                </div>
            `
        },
        'pago': {
            titulo: 'Procesar Pagos',
            contenido: `
                <div class="alert alert-warning">
                    <h6><i class="fas fa-credit-card"></i> Procesar Pagos y Generar Recibos</h6>
                    <ul class="mb-0">
                        <li><strong>Propina:</strong> Porcentaje automático</li>
                        <li><strong>Descuento:</strong> Monto fijo en pesos</li>
                        <li><strong>Domicilio:</strong> Costo de entrega</li>
                        <li><strong>Métodos:</strong> Efectivo, tarjeta, transferencia</li>
                        <li><strong>Recibo:</strong> Preliminar y final</li>
                    </ul>
                </div>
            `
        },
        'clientes': {
            titulo: 'Gestión de Clientes',
            contenido: `
                <div class="alert alert-primary">
                    <h6><i class="fas fa-users"></i> Gestión de Clientes y Domicilios</h6>
                    <ul class="mb-0">
                        <li><strong>Domicilio:</strong> Para entregas a domicilio</li>
                        <li><strong>Recoger:</strong> Para pedidos para llevar</li>
                        <li><strong>Cliente Nuevo:</strong> Se puede crear al momento</li>
                        <li><strong>Datos:</strong> Nombre, teléfono, dirección</li>
                        <li><strong>Historial:</strong> Se guardan para futuras ventas</li>
                    </ul>
                </div>
            `
        },
        'cotizaciones': {
            titulo: 'Gestión de Cotizaciones',
            contenido: `
                <div class="alert alert-info">
                    <h6><i class="fas fa-file-invoice"></i> Crear y Gestionar Cotizaciones</h6>
                    <ul class="mb-0">
                        <li><strong>Nueva Cotización:</strong> Crear propuesta para cliente</li>
                        <li><strong>Buscar:</strong> Por cliente o fecha</li>
                        <li><strong>Editar:</strong> Modificar cotizaciones existentes</li>
                        <li><strong>Imprimir:</strong> Generar documento formal</li>
                        <li><strong>Diferencias:</strong> No afectan inventario, son propuestas</li>
                    </ul>
                </div>
            `
        },
        'nueva-cotizacion': {
            titulo: 'Nueva Cotización',
            contenido: `
                <div class="alert alert-success">
                    <h6><i class="fas fa-plus-circle"></i> Crear Nueva Cotización</h6>
                    <ol class="mb-0">
                        <li><strong>Cliente:</strong> Selecciona cliente existente o crea nuevo</li>
                        <li><strong>Fecha:</strong> Fecha de la cotización</li>
                        <li><strong>Productos:</strong> Busca y agrega items</li>
                        <li><strong>Cantidades:</strong> Especifica cantidades</li>
                        <li><strong>Revisar:</strong> Verifica total y detalles</li>
                        <li><strong>Guardar:</strong> Almacena la cotización</li>
                    </ol>
                </div>
            `
        },
        'editar-cotizacion': {
            titulo: 'Editar Cotización',
            contenido: `
                <div class="alert alert-warning">
                    <h6><i class="fas fa-edit"></i> Modificar Cotización Existente</h6>
                    <ul class="mb-0">
                        <li><strong>Seleccionar:</strong> Elige la cotización a editar</li>
                        <li><strong>Modificar:</strong> Cambia cliente, fecha o productos</li>
                        <li><strong>Agregar:</strong> Nuevos productos si es necesario</li>
                        <li><strong>Eliminar:</strong> Quita productos no deseados</li>
                        <li><strong>Guardar:</strong> Actualiza los cambios</li>
                    </ul>
                </div>
            `
        },
        'imprimir-cotizacion': {
            titulo: 'Imprimir Cotización',
            contenido: `
                <div class="alert alert-primary">
                    <h6><i class="fas fa-print"></i> Generar e Imprimir Documento</h6>
                    <ul class="mb-0">
                        <li><strong>Vista Previa:</strong> Revisa antes de imprimir</li>
                        <li><strong>Formato:</strong> Documento profesional</li>
                        <li><strong>Datos:</strong> Cliente, productos, totales</li>
                        <li><strong>PDF:</strong> Exportar como archivo digital</li>
                        <li><strong>Enviar:</strong> Compartir por email o WhatsApp</li>
                    </ul>
                </div>
            `
        },
        'buscar-cotizacion': {
            titulo: 'Buscar Cotizaciones',
            contenido: `
                <div class="alert alert-info">
                    <h6><i class="fas fa-search"></i> Buscar Cotizaciones</h6>
                    <ul class="mb-0">
                        <li><strong>Por Cliente:</strong> Busca por nombre del cliente</li>
                        <li><strong>Por Fecha:</strong> Filtra por fecha específica</li>
                        <li><strong>Resultados:</strong> Muestra cotizaciones encontradas</li>
                        <li><strong>Acciones:</strong> Editar, imprimir o eliminar</li>
                    </ul>
                </div>
            `
        },
        'items-cotizacion': {
            titulo: 'Items de Cotización',
            contenido: `
                <div class="alert alert-success">
                    <h6><i class="fas fa-list"></i> Gestionar Productos de la Cotización</h6>
                    <ul class="mb-0">
                        <li><strong>Agregar:</strong> Busca y selecciona productos</li>
                        <li><strong>Cantidad:</strong> Especifica cantidad para cada item</li>
                        <li><strong>Precio:</strong> Se calcula automáticamente</li>
                        <li><strong>Modificar:</strong> Cambia cantidad o precio</li>
                        <li><strong>Eliminar:</strong> Quita productos no deseados</li>
                        <li><strong>Total:</strong> Se actualiza automáticamente</li>
                    </ul>
                </div>
            `
        },
        'cierre-caja': {
            titulo: 'Cierre de Caja',
            contenido: `
                <div class="alert alert-success">
                    <h6><i class="fas fa-calculator"></i> Control Financiero Diario</h6>
                    <ul class="mb-0">
                        <li><strong>Resumen de Ventas:</strong> Total por método de pago</li>
                        <li><strong>Gastos del Día:</strong> Registrar todos los gastos</li>
                        <li><strong>Balance Final:</strong> Ventas - Gastos</li>
                        <li><strong>Créditos Pendientes:</strong> Ventas a crédito</li>
                        <li><strong>Información del Cierre:</strong> Nombres y monto base</li>
                    </ul>
                </div>
            `
        },
        'resumen-ventas': {
            titulo: 'Resumen de Ventas',
            contenido: `
                <div class="alert alert-info">
                    <h6><i class="fas fa-chart-bar"></i> Totales por Método de Pago</h6>
                    <ul class="mb-0">
                        <li><strong>Total Ventas:</strong> Suma de todas las ventas del día</li>
                        <li><strong>Efectivo:</strong> Dinero en efectivo recibido</li>
                        <li><strong>Transferencia:</strong> Pagos por transferencia bancaria</li>
                        <li><strong>Tarjeta:</strong> Pagos con tarjeta de crédito/débito</li>
                        <li><strong>Crédito:</strong> Ventas pendientes de pago</li>
                    </ul>
                </div>
            `
        },
        'gestion-gastos': {
            titulo: 'Gestión de Gastos',
            contenido: `
                <div class="alert alert-danger">
                    <h6><i class="fas fa-receipt"></i> Registrar Gastos del Día</h6>
                    <ul class="mb-0">
                        <li><strong>Descripción:</strong> Detalle del gasto realizado</li>
                        <li><strong>Monto:</strong> Cantidad gastada en pesos</li>
                        <li><strong>Fecha:</strong> Cuándo se realizó el gasto</li>
                        <li><strong>Total Gastos:</strong> Suma automática del día</li>
                        <li><strong>Incluir en Balance:</strong> Se descuenta automáticamente</li>
                    </ul>
                </div>
            `
        },
        'balance-final': {
            titulo: 'Balance Final',
            contenido: `
                <div class="alert alert-warning">
                    <h6><i class="fas fa-balance-scale"></i> Cálculo del Balance</h6>
                    <ul class="mb-0">
                        <li><strong>Fórmula:</strong> Total Ventas - Total Gastos = Balance</li>
                        <li><strong>Verificación:</strong> Confirmar que los totales coincidan</li>
                        <li><strong>Base Caja:</strong> Dinero para el siguiente día</li>
                        <li><strong>Documentación:</strong> Guardar registro del cierre</li>
                        <li><strong>Impresión:</strong> Generar comprobante físico</li>
                    </ul>
                </div>
            `
        },
        'informacion-cierre': {
            titulo: 'Información del Cierre',
            contenido: `
                <div class="alert alert-primary">
                    <h6><i class="fas fa-user-check"></i> Datos del Cierre</h6>
                    <ul class="mb-0">
                        <li><strong>Quien Cierra:</strong> Nombre de quien realiza el cierre</li>
                        <li><strong>Quien Recibe:</strong> Nombre de quien recibe la caja</li>
                        <li><strong>Monto Base:</strong> Dinero inicial para el siguiente día</li>
                        <li><strong>Detalles:</strong> Observaciones adicionales</li>
                        <li><strong>Responsabilidad:</strong> Confirmar la transferencia</li>
                    </ul>
                </div>
            `
        },
        'cierre-operativo': {
            titulo: 'Cierre Operativo',
            contenido: `
                <div class="help-content">
                    <h4><i class="fas fa-user-clock text-success"></i> Cierre Operativo - Control de Turnos</h4>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h5 class="text-info">👤 Información del Empleado</h5>
                            <ul>
                                <li><strong>Nombre:</strong> Nombre completo del empleado</li>
                                <li><strong>Cargo:</strong> Posición o rol en el negocio</li>
                                <li><strong>Hora Inicio:</strong> Cuándo comenzó el turno</li>
                                <li><strong>Hora Fin:</strong> Cuándo termina el turno</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5 class="text-warning">📋 Checklist de Tareas</h5>
                            <ul>
                                <li><strong>Limpieza:</strong> Área de trabajo ordenada</li>
                                <li><strong>Inventario:</strong> Verificar stock disponible</li>
                                <li><strong>Equipos:</strong> Verificar funcionamiento</li>
                                <li><strong>Seguridad:</strong> Cerrar y asegurar</li>
                                <li><strong>Mesas:</strong> Verificar estado final</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <h5 class="text-success">💰 Totales de Ventas</h5>
                            <ul>
                                <li><strong>Efectivo:</strong> Ventas en dinero en efectivo</li>
                                <li><strong>Transferencia:</strong> Pagos por transferencia</li>
                                <li><strong>Tarjeta:</strong> Pagos con tarjeta</li>
                                <li><strong>Total General:</strong> Suma de todos los métodos</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5 class="text-primary">🔄 Entrega de Turno</h5>
                            <ul>
                                <li><strong>Quien Recibe:</strong> Nombre del siguiente empleado</li>
                                <li><strong>Cargo:</strong> Posición del que recibe</li>
                                <li><strong>Base Caja:</strong> Dinero que deja para el siguiente</li>
                                <li><strong>Observaciones:</strong> Notas importantes</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="alert alert-info mt-3">
                        <h6><i class="fas fa-lightbulb"></i> Consejos Importantes</h6>
                        <ul class="mb-0">
                            <li><strong>Completar Checklist:</strong> Marcar todas las tareas realizadas</li>
                            <li><strong>Verificar Totales:</strong> Confirmar que los números coincidan</li>
                            <li><strong>Documentar Problemas:</strong> Anotar cualquier incidencia</li>
                            <li><strong>Comunicar Cambios:</strong> Informar al siguiente turno</li>
                        </ul>
                    </div>
                </div>
            `
        }
    };
    
    const ayuda = ayudasEspecificas[tipo];
    if (!ayuda) {
        alert('Ayuda no disponible');
        return;
    }
    
    // Crear modal de ayuda específica
    const modalHTML = `
        <div class="modal fade" id="modalAyudaEspecifica" tabindex="-1" style="z-index: 1070;">
            <div class="modal-dialog">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <img src="image/logo-ToySoft.png" alt="ToySoft" style="width: 32px; height: 32px; margin-right: 8px; vertical-align: middle;">
                            <span style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 600; font-size: 1.2rem; color: #0dcaf0;">Toy Ayudas</span>
                            <span style="color: #ffffff; font-size: 1rem; margin-left: 8px;">- ${ayuda.titulo}</span>
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${ayuda.contenido}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-info" onclick="mostrarAyudaContextual()">
                            <i class="fas fa-book"></i> Ayuda Completa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar modal al body si no existe
    if (!document.getElementById('modalAyudaEspecifica')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    } else {
        // Actualizar contenido si ya existe
        document.getElementById('modalAyudaEspecifica').outerHTML = modalHTML;
    }
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('modalAyudaEspecifica'));
    modal.show();
}

// Inicializar cuando el DOM y toysoft-boot hayan cargado scripts
(function (onReady) {
    if (typeof window.__toysoftOnReady === 'function') window.__toysoftOnReady(onReady);
    else document.addEventListener('DOMContentLoaded', onReady);
})(function () {
    inicializarBotonesAyuda();
    
    // Agregar botón de ayuda flotante si no existe
    if (!document.getElementById('btnAyudaFlotante')) {
        const btnAyuda = document.createElement('button');
        btnAyuda.id = 'btnAyudaFlotante';
        btnAyuda.className = 'btn btn-info position-fixed';
        btnAyuda.style.cssText = `
            bottom: 20px; 
            right: 20px; 
            z-index: 1000; 
            border-radius: 30px; 
            width: 140px; 
            height: 50px; 
            padding: 12px 16px;
            background: linear-gradient(135deg, #0dcaf0 0%, #0a58ca 100%);
            border: none;
            box-shadow: 0 8px 25px rgba(13, 202, 240, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;
        btnAyuda.innerHTML = `
            <img src="image/logo-ToySoft.png" alt="ToySoft" style="width: 36px; height: 36px; margin-right: 10px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.3); filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3)); object-fit: cover;">
            <span style="font-family: 'Orbitron', 'Exo 2', 'Rajdhani', 'Roboto Mono', monospace; font-weight: 800; font-size: 0.95rem; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.4); letter-spacing: 0.3px; line-height: 1.1; display: block; text-align: center;">Toy de<br>Ayudas</span>
        `;
        btnAyuda.title = 'Ayuda (F1)';
        btnAyuda.onclick = mostrarAyudaContextual;
        
        // Efectos hover modernos
        btnAyuda.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 12px 35px rgba(13, 202, 240, 0.6), 0 6px 16px rgba(0, 0, 0, 0.2)';
            this.style.background = 'linear-gradient(135deg, #17a2b8 0%, #0c63e4 100%)';
        });
        
        btnAyuda.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(13, 202, 240, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)';
            this.style.background = 'linear-gradient(135deg, #0dcaf0 0%, #0a58ca 100%)';
        });
        
        // Efecto de click
        btnAyuda.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        btnAyuda.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        document.body.appendChild(btnAyuda);
    }
});