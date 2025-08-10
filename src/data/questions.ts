export interface Question {
  id: number;
  text: string;
  options: { id: string; label: string }[];
  correctId: string;
  explanation?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "¿Qué es la informática en la nube?",
    options: [
      { id: "a", label: "Copias de seguridad de archivos almacenados en dispositivos móviles y de escritorio para evitar la pérdida de datos" },
      { id: "b", label: "Implementación de las aplicaciones conectadas a una infraestructura en las instalaciones" },
      { id: "c", label: "Uso de la entrega bajo demanda de recursos y aplicaciones de TI a través de Internet" },
      { id: "d", label: "Ejecución de código sin necesidad de administrar ni aprovisionar servidores" }
    ],
    correctId: "c",
    explanation: "La informática en la nube es el uso de la entrega bajo demanda de recursos y aplicaciones de TI a través de Internet con precios de pago por uso."
  },
  {
    id: 2,
    text: "¿Cuál es otro nombre para la implementación en las instalaciones?",
    options: [
      { id: "a", label: "Aplicación basada en la nube" },
      { id: "b", label: "Implementación híbrida" },
      { id: "c", label: "Implementación en la nube privada" },
      { id: "d", label: "Nube de AWS" }
    ],
    correctId: "c",
    explanation: "La implementación en las instalaciones también se conoce como implementación en la nube privada."
  },
  {
    id: 3,
    text: "¿Cómo lo ayuda a ahorrar costos la escala de la informática en la nube?",
    options: [
      { id: "a", label: "No es necesario invertir en recursos tecnológicos antes de utilizarlos" },
      { id: "b", label: "El uso agregado de la nube por parte de un gran número de clientes da lugar a precios de pago por uso más bajos" },
      { id: "c", label: "El acceso a los servicios bajo demanda ayuda a evitar la capacidad excesiva o limitada" },
      { id: "d", label: "Puede implementar aplicaciones rápidamente para los clientes y proporcionar baja latencia" }
    ],
    correctId: "b",
    explanation: "El uso agregado de la nube por parte de un gran número de clientes da lugar a precios de pago por uso más bajos."
  },
  {
    id: 4,
    text: "Un cliente quiere utilizar una instancia de Amazon EC2 para una carga de trabajo de procesamiento por lotes. ¿Qué tipo de instancias de Amazon EC2 debería utilizar?",
    options: [
      { id: "a", label: "De uso general" },
      { id: "b", label: "Optimizadas para computación" },
      { id: "c", label: "Optimizadas para memoria" },
      { id: "d", label: "Optimizadas para almacenamiento" }
    ],
    correctId: "b",
    explanation: "Las instancias optimizadas para computación son ideales para cargas de trabajo de procesamiento por lotes que requieren procesadores de alto rendimiento."
  },
  {
    id: 5,
    text: "¿Cuáles son las opciones de duración del contrato para las instancias reservadas de Amazon EC2? (Seleccione DOS opciones)",
    options: [
      { id: "a", label: "1 año" },
      { id: "b", label: "2 años" },
      { id: "c", label: "3 años" },
      { id: "d", label: "4 años" },
      { id: "e", label: "5 años" }
    ],
    correctId: "a",
    explanation: "Las instancias reservadas de Amazon EC2 están disponibles en términos de 1 año y 3 años. Las opciones correctas son A y C."
  },
  {
    id: 6,
    text: "Un cliente tiene una carga de trabajo que se ejecutará durante un total de 6 meses y puede resistir interrupciones. ¿Cuál sería la opción de compra más rentable de instancias de Amazon EC2?",
    options: [
      { id: "a", label: "Instancia reservada" },
      { id: "b", label: "Instancia dedicada" },
      { id: "c", label: "Instancia bajo demanda" },
      { id: "d", label: "Instancia de spot" }
    ],
    correctId: "d",
    explanation: "Las instancias de spot son la opción más rentable para cargas de trabajo que pueden tolerar interrupciones."
  },
  {
    id: 7,
    text: "Un cliente quiere ofrecer a los usuarios mensajes para los temas específicos a los que se han suscrito. ¿Qué servicio debe utilizar?",
    options: [
      { id: "a", label: "Amazon Simple Notification Service (Amazon SNS)" },
      { id: "b", label: "AWS Lambda" },
      { id: "c", label: "Amazon Simple Queue Service (Amazon SQS)" },
      { id: "d", label: "Amazon Elastic Kubernetes Service (Amazon EKS)" }
    ],
    correctId: "a",
    explanation: "Amazon SNS es un servicio de mensajería que permite enviar notificaciones a suscriptores de temas específicos."
  },
  {
    id: 8,
    text: "¿Cuál de las siguientes opciones es VERDADERA respecto de la infraestructura global de AWS?",
    options: [
      { id: "a", label: "Una zona de disponibilidad consiste en una sola región" },
      { id: "b", label: "Una zona de disponibilidad consiste en dos o más regiones" },
      { id: "c", label: "Una región consiste en una única zona de disponibilidad" },
      { id: "d", label: "Una región consiste en dos o más zonas de disponibilidad" }
    ],
    correctId: "d",
    explanation: "Una región de AWS consiste en dos o más zonas de disponibilidad, que proporcionan alta disponibilidad y tolerancia a fallos."
  },
  {
    id: 9,
    text: "¿Qué factores deben tenerse en cuenta al seleccionar una región? (Seleccione DOS opciones)",
    options: [
      { id: "a", label: "Conformidad con los requisitos legales y de gobernanza de datos" },
      { id: "b", label: "Proximidad a los clientes" },
      { id: "c", label: "Acceso al soporte técnico las 24 horas, todos los días" },
      { id: "d", label: "Capacidad de asignar permisos personalizados a diferentes usuarios" },
      { id: "e", label: "Acceso a la interfaz de línea de comandos de AWS (CLI de AWS)" }
    ],
    correctId: "a",
    explanation: "Los factores clave son conformidad con requisitos legales y proximidad a los clientes para menor latencia. Las opciones correctas son A y B."
  },
  {
    id: 10,
    text: "¿Qué afirmación define mejor Amazon CloudFront?",
    options: [
      { id: "a", label: "Es un servicio que le permite ejecutar infraestructura con un enfoque de nube híbrida" },
      { id: "b", label: "Es un motor de cómputo sin servidor para contenedores" },
      { id: "c", label: "Es un servicio que permite enviar y recibir mensajes entre los componentes de software a través de una cola" },
      { id: "d", label: "Es un servicio global de entrega de contenido" }
    ],
    correctId: "d",
    explanation: "Amazon CloudFront es un servicio global de entrega de contenido (CDN) que acelera la distribución de contenido web."
  },
  {
    id: 11,
    text: "¿Qué sitio utiliza Amazon CloudFront a fin de almacenar en caché las copias del contenido para una entrega más rápida a los usuarios en cualquier ubicación?",
    options: [
      { id: "a", label: "Ubicación de borde" },
      { id: "b", label: "Región" },
      { id: "c", label: "Zona de disponibilidad" },
      { id: "d", label: "Origen" }
    ],
    correctId: "a",
    explanation: "Las ubicaciones de borde (Edge Locations) son sitios que CloudFront utiliza para almacenar en caché copias del contenido más cerca de los usuarios."
  },
  {
    id: 12,
    text: "¿Qué acciones puede realizar con AWS Outposts?",
    options: [
      { id: "a", label: "Automatizar las acciones de los servicios y aplicaciones de AWS mediante scripts" },
      { id: "b", label: "Acceder a asistentes y flujos de trabajo automatizados para realizar tareas en los servicios de AWS" },
      { id: "c", label: "Extender la infraestructura y los servicios de AWS a su centro de datos en las instalaciones" },
      { id: "d", label: "Desarrollar aplicaciones de AWS en lenguajes de programación compatibles" }
    ],
    correctId: "c",
    explanation: "AWS Outposts permite extender la infraestructura y servicios de AWS a su centro de datos local."
  },
  {
    id: 13,
    text: "¿Qué componente se puede utilizar para establecer una conexión privada dedicada entre el centro de datos de una empresa y AWS?",
    options: [
      { id: "a", label: "Subred privada" },
      { id: "b", label: "DNS" },
      { id: "c", label: "AWS Direct Connect" },
      { id: "d", label: "Gateway privada virtual" }
    ],
    correctId: "c",
    explanation: "AWS Direct Connect proporciona una conexión de red dedicada desde sus instalaciones a AWS."
  },
  {
    id: 14,
    text: "¿Qué instrucción define los grupos de seguridad?",
    options: [
      { id: "a", label: "Tienen estado y permiten todo el tráfico entrante de forma predeterminada" },
      { id: "b", label: "Tienen estado y deniegan todo el tráfico entrante de forma predeterminada" },
      { id: "c", label: "No tienen estado y permiten todo el tráfico entrante de forma predeterminada" },
      { id: "d", label: "No tienen estado y deniegan todo el tráfico entrante de forma predeterminada" }
    ],
    correctId: "b",
    explanation: "Los grupos de seguridad tienen estado y deniegan todo el tráfico entrante de forma predeterminada."
  },
  {
    id: 15,
    text: "¿Qué componente se utiliza para conectar una VPC a Internet?",
    options: [
      { id: "a", label: "Gateway de Internet" },
      { id: "b", label: "Subred pública" },
      { id: "c", label: "Ubicación de borde" },
      { id: "d", label: "Grupo de seguridad" }
    ],
    correctId: "a",
    explanation: "Un Gateway de Internet permite la comunicación entre las instancias en su VPC e Internet."
  },
  {
    id: 16,
    text: "¿Qué servicio se utiliza para administrar los registros de DNS de los nombres de dominio?",
    options: [
      { id: "a", label: "Amazon Virtual Private Cloud" },
      { id: "b", label: "AWS Direct Connect" },
      { id: "c", label: "Amazon CloudFront" },
      { id: "d", label: "Amazon Route 53" }
    ],
    correctId: "d",
    explanation: "Amazon Route 53 es un servicio de DNS web escalable y altamente disponible."
  },
  {
    id: 17,
    text: "¿Qué afirmación define la resolución de DNS?",
    options: [
      { id: "a", label: "Lanzamiento de recursos en una red virtual definida por el cliente" },
      { id: "b", label: "Almacenamiento de copias locales de contenido en ubicaciones de borde de todo el mundo" },
      { id: "c", label: "Conexión de una VPC a Internet" },
      { id: "d", label: "Traducción de un nombre de dominio a una dirección IP" }
    ],
    correctId: "d",
    explanation: "La resolución de DNS es el proceso de traducir un nombre de dominio a una dirección IP."
  },
  {
    id: 18,
    text: "¿Qué clases de almacenamiento de Amazon S3 están optimizadas para los datos de archivado? (Seleccione DOS opciones)",
    options: [
      { id: "a", label: "S3 Estándar" },
      { id: "b", label: "S3 Glacier" },
      { id: "c", label: "S3 Intelligent-Tiering" },
      { id: "d", label: "S3 Glacier Deep Archive" },
      { id: "e", label: "S3 Estándar - Acceso poco frecuente" }
    ],
    correctId: "b",
    explanation: "S3 Glacier y S3 Glacier Deep Archive están optimizadas para datos de archivado a largo plazo. Las opciones correctas son B y D."
  },
  {
    id: 19,
    text: "Un cliente desea almacenar datos en un servicio de almacenamiento de objetos. ¿Qué servicio de AWS debería utilizar el cliente para este tipo de almacenamiento?",
    options: [
      { id: "a", label: "Amazon Managed Blockchain" },
      { id: "b", label: "Amazon Elastic File System (Amazon EFS)" },
      { id: "c", label: "Amazon Elastic Block Store (Amazon EBS)" },
      { id: "d", label: "Amazon Simple Storage Service (Amazon S3)" }
    ],
    correctId: "d",
    explanation: "Amazon S3 es el servicio principal de almacenamiento de objetos de AWS."
  },
  {
    id: 20,
    text: "¿Qué afirmación define Amazon DynamoDB?",
    options: [
      { id: "a", label: "Es un servicio que permite a los clientes ejecutar bases de datos relacionales en la nube de AWS" },
      { id: "b", label: "Es un servicio de bases de datos de clave-valor sin servidor" },
      { id: "c", label: "Es un servicio que los clientes pueden utilizar para migrar bases de datos relacionales, bases de datos no relacionales y otros tipos de almacenes de datos" },
      { id: "d", label: "Es una base de datos relacional de clase empresarial" }
    ],
    correctId: "b",
    explanation: "Amazon DynamoDB es un servicio de base de datos NoSQL de clave-valor completamente administrado."
  }
];

export const QUESTION_TIME = 20; // segundos por pregunta
export const POINTS_PER_CORRECT = 5;
export const TOTAL_QUESTIONS = 20;
