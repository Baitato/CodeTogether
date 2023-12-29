# Use a base image with your preferred Linux distribution
FROM ubuntu:latest

# Update package lists and install g++
RUN apt-get update \
    && apt-get install -y g++

# Set the working directory (optional)
WORKDIR /usr/src/app

# Specify the default command to run when the container starts (optional)
CMD ["sh", "-c", "g++ Main.cpp 2> compile_status.txt -o a.out && (timeout 5s ./a.out < input.txt > output.txt 2> run_status.txt || (test -s run_status.txt || echo 'Timeout' > run_status.txt) )"]
