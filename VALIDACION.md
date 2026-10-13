# UIO English Academy: auditoría y validación

Fecha: 13 de octubre de 2026. Propuesta local sin publicación ni cambios remotos.

## Fuentes y límites

Se revisó el repositorio https://github.com/THENEXTWEBEC/UIOEnglishAcademyQUITO, rama main descargada en esta fecha. El sitio directo no pudo recuperarse por las herramientas disponibles. El repositorio declara https://uioenglishacademy.org/ como su página principal; esta auditoría se basa en su código, no confirma que producción sea idéntica.

## Hallazgos y decisiones

- La página anterior repite el dominio como nombre de marca; se reemplaza por UIO English Academy.
- Ocho opciones aparecen en tarjetas similares. Se reorganizan en tres objetivos y se mantienen visibles mediante pestañas: avanzar (regular, conversación, one to one), una meta (preparaciones, nivelaciones, supletorios), y empresas.
- Se retiran cifras de experiencia, testimonios y supuestas acreditaciones sin evidencia independiente.
- Las imágenes con nombres ChatGPT/Codex o exec no acreditan personas e instalaciones reales. Se reutiliza una imagen con aviso explícito de que es generada y provisional. La sección institucional usa composición tipográfica.
- Se separa MCER, certificado de academia y examen externo. Los seis niveles no implican que todos estén disponibles en la academia.
- Se elimina el selector de idioma: esta propuesta está completa en español.
- El formulario prepara un correo con alternativa de copia; no guarda datos, envía automáticamente ni reserva cupos.

## Datos pendientes antes de publicar

| Dato | Fuente encontrada | Validación necesaria |
| --- | --- | --- |
| WhatsApp | 099194065 / wa.me/59399194065 | El número local tiene nueve dígitos. Obtener el número completo y probar su titularidad. No se corrigió por suposición ni se creó un enlace operativo. |
| Correo | enqualitylanguages@gmail.com | Confirmar titularidad, vigencia y recepción. Usado solo como destino publicado de una consulta que el visitante debe enviar. |
| Dirección | Av. Gaspar de Villarroel y París, esquina, 4to piso | Confirmar sede, acceso, piso y pin preciso. Maps abre una búsqueda de la intersección, no un establecimiento verificado. |
| Clase demo | La web actual anuncia demo gratis | Confirmar gratuidad, duración, condiciones, disponibilidad y proceso de agenda. La propuesta permite solicitar información, no reservar. |
| Programas | Regular, preparaciones, empresas, conversacionales, nivelaciones, supletorios, one to one | Confirmar oferta vigente, edades, modalidades, niveles, horarios, duración y materiales. |
| Certificaciones | Afirmaciones en el código anterior | Obtener entidad emisora, requisitos, reconocimiento y evidencia de cualquier convenio. |
| Experiencia | Afirmación de 23 años | Obtener fecha de fundación y respaldo documental; omitida del rediseño. |
| Docentes | Afirmación de docentes calificados | Biografías, credenciales, autorización e imágenes reales. |
| Testimonios | Textos sin evidencia de autorización | Identidad, experiencia verificable y consentimiento; sección omitida. |
| Instalaciones y marca | Imágenes generadas y logotipo EnQuality | Fotografías reales autorizadas y archivo de marca aprobado. El logotipo tipográfico UIO es una propuesta. |
| Acompañamiento | Texto de metodología existente | Confirmar diagnóstico, recomendación y seguimiento antes de presentar el flujo propuesto como servicio vigente. |
| Precios y costos | Sin tarifa confirmada | Cotización completa: matrícula, materiales, evaluaciones, certificados e inscripción a exámenes. |

## Implementación

Página estática con archivos index.html, styles.css, app.js y assets/learning-preview.jpg. Sin dependencias de terceros, videos, rastreadores ni fuentes remotas. Usa tipografías locales del sistema y Georgia para el contraste editorial solicitado. Imagen optimizada y con dimensiones reservadas. Menú móvil, enlaces a secciones, pestañas con teclado, preguntas desplegables, etiquetas de formulario y movimiento reducido.

La paleta clara está fijada conforme al brief de blanco cálido y azul tinta. No se conecta un backend ni un servicio de reservas. Mantener la propuesta local hasta completar la validación comercial y aprobar publicación.

## Verificación realizada

- JavaScript: comprobación de sintaxis correcta.
- HTML: identificadores únicos, enlaces internos y archivos locales comprobados.
- Navegador: sin errores JavaScript capturados; imagen cargada correctamente.
- Pestañas: selección por clic y flechas de teclado comprobada.
- Móvil: menú abre, navega y se cierra correctamente.
- Preguntas frecuentes: apertura comprobada.
- Formulario: con datos ficticios se muestra el mensaje preparado y la alternativa de copia. No se envió correo. La entrega a la academia y la aplicación de correo externa no se verificaron.
- Adaptación: ancho del documento coincide con la ventana en 391 px, 768 px y 1365 px. Ambas acciones principales quedan dentro de la altura de 768 px en laptop.
- Capturas: preview/escritorio.jpg y preview/movil.jpg.
- No se midieron Lighthouse ni métricas de carga en producción. No se verificaron titularidad de contactos ni pin comercial de Maps.
- Referencia MCER verificada con https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions.
