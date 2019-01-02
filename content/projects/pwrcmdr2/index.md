---
title: pwrcmdr2
author: Bouni
description: Frischzellenkur für unseren pwrCMDr!
date: 2018-10-17
draft: false
image: pwrcmdr2.png 
---

# Warum?

Unser aktueller pwrCMDr besteht aus einem Arduino-Ethernet auf einer selbstgeätzten Platine.
Da wir immer wieder Probleme damit haben soll etwas neues her, das vielleicht etwas mehr Spielraum gibt um Änderungen/Verbesserungen zu integrieren.

# Was soll der neue alles können?

 - Ein Linux als OS mit SSH (Nice to have)✓ 
 - HTTPS ✓ 
 - 24VDC tolerante Ein- und Ausgänge ✓ 
 - Wieder Ansteuerung der Relais mit Selbsthaltung, so das man im Falle eines Ausfalls weiterhin die Stromkreise schalten kann. ✓ 
 - Stromverbrauchsmessung, hier wäre sicher zu klären ob der Puls Ausgang auf dem Stromzähler wirklich defekt ist.
   - Es gibt für ca. 20@€ fast die selben 3-Phasen Stromzähler wie der momentan verbaute auf EBay
 - Temperaturmessung -> 1-Wire
 - Luftfeuchtigkeitsmessung -> 1-Wire
   - Evtl. mit einem DHT22 Temperatur und Luftfeuchte messen! 
   - DHT-22 kostet ca. 5€
 - Helligkeitsmessung
   - LDR kostet ca. 1.50€
 - Gas Sensor für Luftqualitätsmessung
   - MQ-135 kostst ca. 3€
 - PIR Sensor um Bewegung zu erkennen
   - Ist schon vorhanden 


# Hardware

## Board

 - RaspberryPi 3 B+
   - ca. 35€ (ohne SD Karte), bei z.B. Amazon

Folgende Optionen wurden aus diversen Gründen verworfen:

 - ~~ESP32 NodeMCU~~
   - ca. 10€, bei Amazon
 - ~~RaspberryPi Zero W~~  
   - ca. 11€ (ohne SD karte), bei z.B. sertronics-shop.de
 - ~~OrangePi Zero H2~~
   - ca. 28€ (ohne SD Karte), bei z.B. Amazon

## Formfaktor

~~Schick wäre das ganze in ein Hutschienengehäuse verbauen zu können wie z.B.:~~

Ist bestellt mitsamt einem RspberryPi 3B+

[Pollin, Hutschienengehäuse für RPi, 8TE, 14.95€](https://www.pollin.de/p/hutschienen-gehaeuse-fuer-raspberry-pi-model-b-8te-702341)
 
