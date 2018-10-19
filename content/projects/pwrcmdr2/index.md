---
title: pwrcmdr2
author: Bouni
description: Frischzellenkur für unseren pwrCMDr!
date: 2018-10-17
draft: false
image: 
---

# Warum?

Unser aktueller pwrCMDr besteht aus einem Arduino-Ethernet auf einer selbstgeätzten Platine.
Da wir immer wieder Probleme damit haben soll etwas neues her, das vielleicht etwas mehr Spielraum gibt um Änderungen/Verbesserungen zu integrieren.

# Was soll der neue alles können?

 - Ein Linux als OS mit SSH (Nice to have)
 - HTTPS
 - 24VDC tolerante Ein- und Ausgänge
 - Wieder Ansteuerung der Relais mit Selbsthaltung, so das man im Falle eines Ausfalls weiterhin die Stromkreise schalten kann.
 - Stromverbrauchsmessung, hier wäre sicher zu klären ob der Puls Ausgang auf dem Stromzähler wirklich defekt ist.
 - 1-Wire Temperaturmessung
 - Luftfeuchtigkeitsmessung
 - Helligkeitsmessung

# Mögliche Hardware

 - ESP32 NodeMCU
 - RaspberryPi 3 B+
 - RaspberryPi Zero W  
 - OrangePi
 - NanoPi

**ToDo**: Preise für die Devices herausfinden und nachtragen

## Formfaktor

Schick wäre das ganze in ein Hutschienengehäuse verbauen zu können wie z.B. eines hiervon:

 - [Pollin, Hutschienengehäuse für RPi, 8TE, 14.95€](https://www.pollin.de/p/hutschienen-gehaeuse-fuer-raspberry-pi-model-b-8te-702341)
 - [Pollin, Hutschienengehäuse 6TE, 5.95€](https://www.pollin.de/p/hutschienengehaeuse-6-c-105x71x90-mm-460147)
