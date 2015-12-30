# -*- mode: ruby -*-
# vi: set ft=ruby :

$bootstrap_docker = <<SCRIPT
  bail() {
      echo Error executing command, exiting
      exit 1
  }

  exec_cmd() {
      if ! [[ "$2" == "-q" ]]
          then echo "Executing $1"
      fi

      sudo -n bash -c "$1" || bail
  }

  print_header() {
      echo ""
      echo "## $1 ##"
      echo ""
  }

  print_banner() {
      echo "############################################"
      echo "##            Install docker              ##"
      echo "##           and docker-compose           ##"
      echo "############################################"
  }

  # main
  print_banner

  print_header "Add docker PPA"
  exec_cmd "wget -qO- https://get.docker.io/gpg | apt-key add -"
  exec_cmd "echo deb http://get.docker.io/ubuntu docker main | tee /etc/apt/sources.list.d/docker.list"

  print_header "Install docker"
  exec_cmd "apt-get -q update && apt-get -qy install lxc-docker"

  print_header "Add vagrant user to docker group"
  exec_cmd "usermod -aG docker vagrant"

  print_header "Install docker-compose"
  exec_cmd "curl -sL https://github.com/docker/compose/releases/download/1.5.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
  exec_cmd "chmod +x /usr/local/bin/docker-compose"
SCRIPT

$build_dev = <<SCRIPT
  mkdir -p /isomorphic_react_dev
  cp -rf /vagrant/** /isomorphic_react_dev
  cd /isomorphic_react_dev
  docker-compose -f docker-compose-dev.yml build
  docker-compose -f docker-compose-dev.yml stop
  docker-compose -f docker-compose-dev.yml rm --force
  docker-compose -f docker-compose-dev.yml up -d
SCRIPT

$build_prod = <<SCRIPT
  mkdir -p /isomorphic_react_prod
  cp -rf /vagrant/** /isomorphic_react_prod
  cd /isomorphic_react_prod
  docker-compose -f docker-compose-prod.yml build
  docker-compose -f docker-compose-prod.yml stop
  docker-compose -f docker-compose-prod.yml rm --force
  docker-compose -f docker-compose-prod.yml up -d
SCRIPT

Vagrant.configure(2) do |config|
  config.vm.box = "phusion/ubuntu-14.04-amd64"
  
  config.vm.network "forwarded_port", guest: 7777, host: 8777
  config.vm.network "forwarded_port", guest: 7999, host: 8999

  config.vm.provision "bootstrap_docker", inline: $bootstrap_docker, type: "shell"
  config.vm.provision "build_dev",        inline: $build_dev,        type: "shell"
  config.vm.provision "build_prod",       inline: $build_prod,       type: "shell"
end
