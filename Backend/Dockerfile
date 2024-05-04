# Use the official Maven image as the build stage
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the Maven project file
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy the entire source code
COPY src ./src

# Build the application
RUN mvn package -DskipTests

# Use the official OpenJDK image for Java 17 as base
FROM eclipse-temurin:17 

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the compiled JAR file from the build stage
COPY --from=build /usr/src/app/target/go-beyond-classroom-0.0.1-SNAPSHOT.jar .

# Expose the port that your Spring Boot application listens on (if applicable)
 EXPOSE 8080

# Define the default command to run your Spring Boot application
CMD ["java", "-jar", "go-beyond-classroom-0.0.1-SNAPSHOT.jar"]