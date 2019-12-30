# Getting the OS on your Raspberry Pi

## Get Raspberry Pi on your SD card
[These instructions](https://www.raspberrypi.org/documentation/installation/installing-images/) are
more detailed. Or you can use my appreviated ones below.
Open a terminal and move to a temporary folder.

    cd ~/Downloads

Download [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)
to your hard drive and unzip it.

    curl -L https://downloads.raspberrypi.org/raspbian_full_latest --output raspbian.zip
    unzip raspbin.zip

Download [balenaEtcher](https://www.balena.io/etcher/). Run it and Point belanaEtcher at the Rasbian image
and your SD card. When complete your SD card should be renamed to boot and cotain the rasbian image.

    ls /Volumes/boot

## enable SSH
    sudo touch /Volumes/boot/SSH

## enable Wifi
    sudo nano /Volumes/boot/ wpa_supplicant.conf

Then add the text below, replacing  \*\*ssid_name\*\* and \*\*ssid_password\*\* with your wifi name
and password. Note: don't use your guest network. ssh won't work on your
guest network assuming it is configured properly.

    country=US
    update_config=1
    ctrl_interface=/var/run/wpa_supplicant
    
    network={
      scan_ssid=1
      ssid="**ssid_name**"
    psk="**ssid_password**"
    }

# Configure your Raspberry Pi

## SSH into your Raspberry Pi
Turn on your Raspberry Pi. LEDs should flash and it will connect to your Wifi. Choose your favorite
method to figure out what devices are connected to your Wifi network and find the IP address of your
Raspberry Pi. It'll look something like 192.168.1.62. We'll use this in our examples below.

    ssh pi@192.168.1.62

When asked for the password enter 'raspberry' without the quotes.

After logging in, change the default password using the command below so your raspberry can't be
easily hacked!

    sudo raspi-config

Read the menu options and do the following:
- change your password or you will be hacked!
- Interfacing Options -> SSH -> Yes (note: the ssh file we added above is a one-time thing)


## Enable VNC Server
Now let's install VNC Server so we have access to a GUI in case we want it in the future.

On your Mac, go to [this link](https://www.realvnc.com/en/connect/download/viewer/) to
download and then install the Real VNC Viewer.

On your Raspberry Pi, run the following:

    sudo apt update
    sudo apt install realvnc-vnc-server realvnc-vnc-viewer
    sudo raspi-config

And then enable VNC.

- Navigate to Interfacing Options
- Scroll down and select VNC > Yes.

Now test it out by running the VNC Viewer on your Mac and connecting to the IP address of the
Raspberry Pi. If you are asked to update software after logging in, answer yes.

## Install Nginx
    sudo apt install nginx
    sudo /etc/init.d/nginx start

### Test web server
Open your favorite browser and navigate to the IP of your Rapberry Pi. (i.e. http://192.168.1.62/)

## Install/Upgrade Node/npm
The version of Raspbian I got at the time of this writing Dec/2019 already had node on it. In case
yours doesn't.

    apt-get install npm
    apt-get install node@10

However,
when running npm, I got a warning that the version of npm wasn't compatible with v10 of node.js.
So I upgraded npm with the following command:

    sudo npm install npm@latest -g

## Install Other Stuff
    sudo apt-get install -y chromium-browser ttf-mscorefonts-installer unclutter x11-xserver-utils
- Chromium browser (already installed)
- web fonts
- hide mouse pointer
- turn off screen blanking

## 7 inch Display

    sudo vi /boot/config.txt

Change the resolution to 800x480.

From:

    # uncomment to force a console size. By default it will be display's size minus
    # overscan.
    #framebuffer_width=1280
    #framebuffer_height=720

To:

    # uncomment to force a console size. By default it will be display's size minus
    # overscan.
    #framebuffer_width=1280
    #framebuffer_height=720
    framebuffer_width=800
    framebuffer_height=480
    