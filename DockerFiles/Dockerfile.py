# Use a base image with your preferred Linux distribution and Python
FROM ubuntu:latest

# Update package lists and install Python
RUN apt-get update \
    && apt-get install -y python3

# Set the working directory (optional)
WORKDIR /usr/src/app

# Specify the default command to run when the container starts (optional)
CMD ["sh", "-c", "(timeout 5s python3 Main.py < input.txt > output.txt 2> run_status.txt) || (test -s run_status.txt || echo 'Timeout' > run_status.txt)"]
