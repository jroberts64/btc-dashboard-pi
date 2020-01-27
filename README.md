# Getting the OS on your Raspberry Pi

## Get Raspberry Pi on your SD card
[These instructions](https://www.raspberrypi.org/documentation/installation/installing-images/) are
more detailed. Or you can use my appreviated ones below.

Open a terminal and move to a temporary folder.For example:

    cd ~/Downloads

Download [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)
to your hard drive and unzip it.

    curl -L https://downloads.raspberrypi.org/raspbian_full_latest --output raspbian.zip
    unzip raspbin.zip

Download [balenaEtcher](https://www.balena.io/etcher/). Run it and help belanaEtcher find the Raspbian image
you just downloaded and the SD card you have insterted into your computer. When complete your SD card should be renamed to boot and contain the rasbian image. On a Mac you can see it with this command.

    ls /Volumes/boot

## enable SSH
    sudo touch /Volumes/boot/SSH

## enable Wifi
    sudo nano /Volumes/boot/ wpa_supplicant.conf

Then add the text below, replacing  \*\*ssid_name\*\* and \*\*ssid_password\*\* with your wifi name
and password. 

Note: don't use your guest network. Most modern Wifi routers block communication between devices
on the guest network.

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
method (i.e. http://192.168.1.1) to figure out what devices are connected to your Wifi network 
and find the IP address of your
Raspberry Pi. It'll look something like 192.168.1.62. We'll use this IP in our examples below.

Login to you Raspberry Pi.

    ssh pi@192.168.1.62

When asked for the password enter 'raspberry' without the quotes.

After logging in, change the default password using the command below so your raspberry can't be
easily hacked!

    sudo raspi-config

Usethe menu options do the following:
- change your password (Important: More than your R Pi will be hacked if you don't change the default pwd!)
- Interfacing Options -> SSH -> Yes (note: the file to enable ssh we added above is a one-time thing. It gets deleted after you login.)

### Install Nginx
    sudo apt install nginx
    sudo /etc/init.d/nginx start

### Test web server
Open your favorite browser and navigate to the IP of your Rapberry Pi. (i.e. http://192.168.1.62/)

### Install/Upgrade Node/npm
The version of Raspbian I got at the time of this writing Dec/2019 already had node on it. In case
yours doesn't.

    apt-get install npm
    apt-get install node@10

However,
when running npm, I got a warning that the version of npm wasn't compatible with v10 of node.js.
So I upgraded npm with the following command:

    sudo npm install npm@latest -g

### Install Other Stuff
Install:
- Chromium browser (probably already installed)
- web fonts

    sudo apt-get install -y chromium-browser ttf-mscorefonts-installer


### Configure 7 inch Display
Edit the boot config:

    sudo vi /boot/config.txt

Add the following line to the file if you need to rotate the screen 
180 degrees. Some cases turn the screen upside down.

    lcd_rotatee=2

### Kiosk Mode

Kiosk mode is using the Raspberry Pi as a dedicated device like a store
display, alarm clock, weather station or bitcoin network monitoring
device.

#### Create a specialized kiosk user
If you want to run in kiosk mode, you should create a user for this instead
of running as the user pi. I created a user called "kiosk" as follows:

    sudo adduser kiosk

Add user to gpio group so we can access motion sensor

    sudo adduser gpio

Now change the autologin user from pi to kiosk. 

    vi /etc/lightdm/lightdm.conf

Change autologin-user=pi to autologin-user=kiosk.

#### Hide Mouse Pointer

    unclutter x11-xserver-utils



## Enable VNC Server (optional)
Now let's install VNC Server in case we want to access the GUI from a mac/pc in the future. I prefer ssh, but did this initially in order to do development
without needed the 7 inch display attached to the Raspberry Pi.

### Raspberry Pi
Run the following:

    sudo apt update
    sudo apt install realvnc-vnc-server realvnc-vnc-viewer
    sudo raspi-config

And then enable VNC.

- Navigate to Interfacing Options
- Scroll down and select VNC > Yes.

Now test it out by running the VNC Viewer on your Mac and connecting to the IP address of the
Raspberry Pi. If you are asked to update software after logging in, answer yes.

### Change the resolution to 800x480 (optional)

Only do this if you want to mimic the size of the 7 inch display when you are remotely accessing on your mac or PC. I used this trick for a few days in
order to test code I was writing for the display.

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
  
### Mac
On your Mac, go to [this link](https://www.realvnc.com/en/connect/download/viewer/) to
download and then install the Real VNC Viewer.

### PC
ToDo


