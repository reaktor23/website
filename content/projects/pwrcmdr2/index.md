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
   - ca. 10€, bei Amazon
 - RaspberryPi 3 B+
   - ca. 35€ (ohne SD Karte), bei z.B. Amazon
 - RaspberryPi Zero W  
   - ca. 11€ (ohne SD karte), bei z.B. sertronics-shop.de
 - OrangePi Zero H2 
   - ca. 28€ (ohne SD Karte), bei z.B. Amazon
