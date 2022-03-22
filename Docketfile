FROM openjdk:8
ADD target/docker-springboot-myapp.jar docker-springboot-myapp.jar
EXPOSE 8099
ENTRYPOINT ["java", "-jar", "docker-springboot-myapp.jar"]