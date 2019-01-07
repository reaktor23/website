---
title: CNC Fräse
author: Valentin, Bouni
description: Eine CNC Fräse für unsern Hackerspace
draft: false
date: 2018-08-22
image: DSC_0046.JPG

---

# Vorgeschichte

Es bestand schon lange der Plan, eine CNC Fräse zu bauen, doch das war lange nur ein Plan.
Vor ca. einem Jahr ist die Fräse von Valentin im Zuge von Jugend Forscht gebaut worden.
Leider bereitet das [Smoothieboard](http://smoothieware.org/smoothieboard), das die Fräse steuert, ein paar Probleme.
Deshalb wurde beschlossen, auf eine LinuxCNC basierte Steuerung umzubauen. 
Diesen Prozess werden wir hier dokumentieren.

# Video
{{< youtube id="DZV8DQtpf2Q" >}}


# Hardware

## Elektronik

Angetrieben werden die Achsen von Nema34 Schrittmotoren. Diese werden von [Treiberkarten]() und 60V Netzteilen mit Strom versorgt. Die [Spindel](http://cnc.a-ueberbach.de/spindle/alles-ueber-die-22kw-chinaspindel/) ist über einen Frequenzumrichter des Herstellers HuanYang angeschlossen. Dieser spricht einen kuriosen Modbus-Dialekt. Motoren und Spindel sind bzw. waren an der Steuerung [Smoothieboard V1](http://smoothieware.org/smoothieboard) angeschlossen. Hier sind ebenfalls Endschalter angeschlossen. Fräsdateien und Steuerungsinputs bekommt das Board per Ethernet.

Grundsätzlich ist das Smoothieboard eine gute 3D-Drucker-Steuerung, die viele Möglichkeiten bietet. Für den Betrieb an unserer Maschine haben wir allerdings im Laufe der Zeit herausgefunden, dass es noch nicht die optimale Lösung ist. Auf Feedrate-Override oder Nothalt reagiert die Steuerung erst nachdem eine Programmzeile beendet ist.

Wärend das beim Würstchendrucker nicht so schlimm ist, stellt das bei einer etwas seriöseren Maschine ein Sicherheitsrisiko dar und so haben wir uns entschieden, die Steuerung auf ein LinuxCNC-basierendes System umzubauen.

Wir haben uns nach langer Entscheidungszeit für eine [Mesa 7i96](http://store.mesanet.com/index.php?route=product/product&product_id=311) FPGA-Karte entschieden da diese via Ethernet mit einem beliebigen PC verbunden werden kann auf dem LinuxCNC läuft. Ausserdem bietet sie alles, was wir benötigen, zum kleinen Preis. Bestellt wurde die Karte bei [EUsurplus](http://eusurplus.com).

Nach den ersten Versuchen stellte sich heraus, dass es sich um ein selten verwendetes Modell handelt und die Konfiguration etwas mehr Arbeit erforderdert, als beispielsweise die größere 7i77. Dennoch haben wir bereits am ersten Abend geschafft, einen Ausgang blinken zu lassen und einen Motor drehen zu lassen. Wie es mit der Steuerung weitergeht, werden wir weiter unten genauer beschreiben.

## Mechanik

Ich habe mit meiner Projektarbeit eine Dokumentation erstellt, in denen Details zum Planung und zum Bau der Maschine beschrieben werden. Diese Dokumentation kann [hier](https://github.com/reaktor23/website/raw/master/content/projects/cncmill/Seminarkursarbeit_f%C3%BCr_R23.pdf) heruntergeladen werden.

# Umbau auf LinuxCNC - Ein Meisterwerk in ??? Akten

## Erster Akt: Das Realtime - Betriebssystem installieren

Debian Stretch Netinstaller von [hier](https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-9.6.0-amd64-netinst.iso) herunterladen.

Image mit z.B. dd auf einen USB Stick schreiben (Achtung, sichergehen das /dev/sdb auch der USB Stick ist!):

```
sudo dd if=debian-9.6.0-amd64-netinst.iso of=/dev/sdb bs=4M status=progress
```

USB Stick in den Rechner und davon booten, Debian installieren und anschliessend das frisch installierte System booten.

Terminal öffnen und folgende Befehle ausführen:

```
# Als Root anmelden 
su -

# System updaten
apt-get update
apt-get upgrade
apt-get dist-upgrade$

# Realtime kernel installieren
apt-get install linux-image-rt-amd64

# sudo installieren
apt-get install sudo
# User der Gruppe sudo hinzufügen
useradd -a -G sudo <username>

#dirmngr installieren um Fehler beim den Nachfolgenden befehlen zu verhindern
apt-get install dirmngr

# Key des linuxcnc buildbots hinzufügen
apt-key adv --keyserver hkp://keys.gnupg.net --recv-key E0EE663E

# buildbot repo zur sources.list hinzufügen
add-apt-repository "deb http://buildbot.linuxcnc.org/ stretch master-rtpreempt"

# Paketquellen installieren
apt-get update

# linuxcnc installieren
apt-get install linuxcnc-uspace

# Nützliche Pakete installieren
apt-get install vim git

# System neu starten
reboot
```

PC neu starten, ein Terminal öffnen und mit `uname -a` ob der PREEMT RT Kernel geladen wurde.
Da sollte dann so etwas wie `Linux mill 4.9.0-8-rt-amd64 #1 SMP PREEMPT RT Debian 4.9.130-2 (2018-10-27) x86_64 GNU/Linux` stehen

## Zweiter Akt: Netzwerkverbindung herstellen

Die MESA-Karte hat standardmäßig die IP 192.168.1.121 . Um mit der Karte kommunizieren zu können muss am Computer eine statische IP-Adresse vergeben werden. Dazu oben rechts im Panel auf das Netzwerksymbol rechtsklicken und Edit Connections... auswählen. Im sich öffnenden Fenster eine neue Verbindung erstellen, Èthernet auswählen und bestätigen. Es öffnet sich ein neues Fenster. Im Tab Ethernet wird bei Device die richtige Netzwerkkarte ausgewählt. Im Tab IPv4 Settings wird manual ausgewählt. Mit einem Klick auf Add wird eine Verbindung mit der Adresse 192.168.1.1 und der Netzwaske 24 eingegeben. das Gateway bleibt offen. Alle Fenster bestätigen und schließen. Nun im Panel oben rechts erneut auf das Netzwerkysmbol klicken und die neu erstellte Verbindung auswählen.

Zum Testen wird ein Terminal geöffnet, in dem der Befehl `ping -c 4 191.168.1.1` eingegeben wird. Lautet die Antwort `4 packets transmitted, 4 received, 0% packet loss`, so sollte alles richtig eingestellt sein.

## Dritter Akt: LinuxCNC einrichten und erster Funktionstest

Wir haben die Funktion von linuxcnc mit der mitgelieferten config getestet. Hierzu waren jedoch einige Anpassungen für unsere Mesa 7i96 Ethernet Karte notwendig. Diese sind weiter unten beschrieben

Um die Funktion zu testen, haben wir einen Schrittmotor angeschlossen und diesen in LinuxCNC hin- und her fahren lassen:
{{< youtube id="eHHdeMp9l_A" >}}

## Vierter Akt: Konfiguration

Die Konfiguration findet über **.ini** und **.hal** files statt. Diese liegen auf unserem Fräsen Rechner unter `~/linuxcnc` aber im Grunde ist es egal wo man seine config files ablegt, man übergibt den Pfad zum .ini file sowieso beim starten von linuxcnc.

```
# ins home verzeichnis wechseln
cd ~
# Konfig unserer Fräse von Github clonen
git clone https://github.com/reaktor23/Fraese-Config.git linuxcnc
```

Um linuxcnc zu starten ein terminal öffnen und `linuxcnc ~/linuxcnc/7i76-1k.ini` eingeben und starten.

Da wir doch auch an sehr vielen Stellen unsere Probleme hatten, werden wir versuchen einige davon hier detailierter zu beschreiben.

# Update 07.01.2019 - Handrad

Wir konten ein gebrauchtes Handrad ([Euchner HBA](https://www.euchner.de/de-de/Produkte/Handbedienger%C3%A4te-und-Handr%C3%A4der/Handbedienger%C3%A4t-HBA/HBA-079827)) ergattern und haben dieses währen des [35C3](https://events.ccc.de/congress/2018) erfolgreich in unser LinuxCNC Setup integrieren.
Das Handrad verfügt über:

- 2 Wahlschalter, einen Achse, der andere für die Schrittweite
- 3 Folientasten +, Eilgang, - (derzeit nicht verwendet)
- 2 Parallel geschaltete Freigabetaster (derzeit nicht verwendet)
- 1 NOT-STOP Taster
- 1 Drehencoder

Alle Signale wurden auf einem Arduino Nano aufgelegt ([Link zum Sketch](https://github.com/reaktor23/Fraese-Config/blob/master/handwheel/handwheel_arduino/handwheel_arduino.ino)), dieses sendet bei Änderung die daten Seriell zum PC, z.B. Plus:1 für Plustaste ist gedrückt.
Dort liegt ein [Python Programm](https://github.com/reaktor23/Fraese-Config/blob/master/handwheel/handwheel.py) das die Daten auswertet und an Linux CNC weiterreicht [Link zum HAL File](https://github.com/reaktor23/Fraese-Config/blob/master/handwheel/handwheel.hal).
In der INI muss lediglich das HAL file eingebunden werden [Link zur betreffenden INI Zeile](https://github.com/reaktor23/Fraese-Config/blob/master/7i96-1k.ini#L99)
