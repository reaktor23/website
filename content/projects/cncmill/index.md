---
title: CNC Fräse
author: Valentin, Bouni
description: Eine CNC Fräse für unsern Hackerspace
draft: false
date: 2018-08-22
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

Angetrieben werden die Achsen von Nema34 Schrittmotoren. Diese werden von [Treiberkarten]() und 60V Netzteilen mit Strom versorgt. Die (Spindel)[http://cnc.a-ueberbach.de/spindle/alles-ueber-die-22kw-chinaspindel/] ist über einen Frequenzumrichter des Herstellers HuanYang angeschlossen. Dieser spricht einen kuriosen Modbus-Dialekt. Motoren und Spindel sind bzw. waren an der Steuerung (Smoothieboard V1)[http://smoothieware.org/smoothieboard] angeschlossen. Hier sind ebenfalls Endschalter angeschlossen. Fräsdateien und Steuerungsinputs bekommt das Board per Ethernet.

Grundsätzlich ist das Smoothieboard eine gute 3D-Drucker-Steuerung, die viele Möglichkeiten bietet. Für den Betrieb an unserer Maschine haben wir allerdings im Laufe der Zeit herausgefunden, dass es noch nicht die optimale Lösung ist. Auf Feedrate-Override oder Nothalt reagiert die Steuerung erst nachdem eine Programmzeile beendet ist.

Wärend das beim Würstchendrucker nicht so schlimm ist, stellt das bei einer etwas seriöseren Maschine ein Sicherheitsrisiko dar und so haben wir uns entschieden, die Steuerung auf ein LinuxCNC-basierendes System umzubauen.

Wir haben uns nach langer Entscheidungszeit für eine [Mesa 7i96](http://store.mesanet.com/index.php?route=product/product&product_id=311) FPGA-Karte entschieden da diese via Ethernet mit einem beliebigen PC verbunden werden kann auf dem LinuxCNC läuft. Ausserdem bietet sie alles, was wir benötigen, zum kleinen Preis. Bestellt wurde die Karte bei [EUsurplus](http://eusurplus.com).

Nach den ersten Versuchen stellte sich heraus, dass es sich um ein selten verwendetes Modell handelt und die Konfiguration etwas mehr Arbeit erforderdert, als beispielsweise die größere 7i77. Dennoch haben wir bereits am ersten Abend geschafft, einen Ausgang blinken zu lassen und einen Motor drehen zu lassen. Wie es mit der Steuerung weitergeht, werden wir weiter unten genauer beschreiben.

## Mechanik

Ich habe mit meiner Projektarbeit eine Dokumentation erstellt, in denen Details zum Planung und zum Bau der Maschine beschrieben werden. Diese Dokumentation kann [hier](https://github.com/reaktor23/website/raw/master/content/projects/cncmill/Seminarkursarbeit_f%C3%BCr_R23.pdf) heruntergeladen werden.

# Umbau auf LinuxCNC - Ein Meisterwerk in ??? Akten

## Erster Akt: Das Realtime - Betriebssystem installieren
Debian 9.5.0 [hier](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/9.5.0+nonfree/amd64/iso-cd/firmware-9.5.0-amd64-netinst.iso) runterladen und damit einen bootbaren USB Stick erstellen. Graphical Install auswählen, und alles mit Standardeinstellungen installieren.

Im frisch installierten Debian öffnet man den Synaptic-Paketmanager und installiert linux-image-latest.version-rt. 

PC neu starten und in einem Terminal `uname -a` eingeben und überprüfen, ob der PREEMT RT Kernel geladen wurde.
Wenn alles Stimmt, folgen die folgenden Befehle, um das System zu aktualisieren und die neuste Version von LinuxCNC aus dem Master-Ding zu installieren.

```
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install dirmngr
sudo apt-get install software-properties-common
*** to get the buildbot current build
sudo apt-key adv --keyserver hkp://keys.gnupg.net --recv-key E0EE663E
sudo add-apt-repository "deb http://buildbot.linuxcnc.org/ stretch master-rtpreempt"
sudo apt-get update
sudo apt-get install linuxcnc-uspace
```

Nun ist es spät geworden, weitere dokumentation folgt...  --Valentin, 23.August.18
