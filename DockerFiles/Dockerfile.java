# Use a base image with your preferred Linux distribution and Java
FROM ubuntu:latest

# Update package lists and install OpenJDK
RUN apt-get update \
    && apt-get install -y openjdk-11-jdk

# Set the working directory (optional)
WORKDIR /usr/src/app

# Copy your Java source file into the container
COPY Main.java /usr/src/app/Main.java

# Specify the default command to run when the container starts (optional)
CMD ["sh", "-c", "javac Main.java 2> compile_status.txt && (timeout 5s java Main < input.txt > output.txt 2> run_status.txt || (test -s run_status.txt || echo 'Timeout' > run_status.txt) )"]
