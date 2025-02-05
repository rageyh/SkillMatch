# Usa una base OpenJDK 17
FROM openjdk:21-jdk-slim

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia il file JAR compilato dell'applicazione Spring Boot
COPY build/libs/skillmatch.jar app.jar

# Espone la porta su cui l'applicazione Spring Boot è in ascolto
EXPOSE 8080

# Comando per avviare l'applicazione
ENTRYPOINT ["java", "-jar", "app.jar"]