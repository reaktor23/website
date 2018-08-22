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
Leider bereitet das [Smoothieboard](http://smoothieware.org/smoothieboard), das die Fräse steuert, viele Probleme.
Deshalb wurde beschlossen, auf eine LinuxCNC basierte Steuerung umzubauen. 
Diesen Prozess werden wir hier dokumentieren.

# Video
{{< youtube id="DZV8DQtpf2Q" >}}


# Hardware

## Elektronik

Wir haben uns für eine [Mesa 7i96](http://store.mesanet.com/index.php?route=product/product&product_id=311) FPGA Karte entschieden da diese via Ethernet mit einem beliebigen PC verbunden werden kann auf dem LinuxCNC läuft.
Ausserdem bietet sie alles was wir benötigen zum kleinen Preis.
Bestellt wurde die Karte bei [EUsurplus](http://eusurplus.com).

## Mechanik

Ich habe mit meiner Projektarbeit eine Dokumentation erstellt, in denen Details zum Planung und zum Bau der Maschine beschrieben werden. Diese Dokumentation kann [hier]() heruntergeladen werden.

# Software
