FROM openjdk:8
ADD target/springsecurity.jar springsecurity.jar
EXPOSE 8099
ENTRYPOINT ["java", "-jar", "springsecurity.jar"]