---
title: RESTfan
author: Bouni
description: Ein Wandventilator mit REST API
date: 2020-09-01
draft: false
image: Tristar-VE-5874.jpg 
---

Wir haben seit wir den Reator gegründet haben das Problem das es im Sommer unangenehm warm wird und wir nur die Eingangstüre als Lüftungsmöglichkeit.
Drum haben wir uns diesen Sommer entschieden einen dieser günstigen Wandventilatoren zu kaufen um es ein wenig erträglicher zu haben.

Das das ganze nicht wie vom Hersteller gedacht über Zugschnüre gesteuert werden soll versteht sich ja von selbst :sunglasses:

# Ausgangszustand

{{< thumbnail src="Restfan-0.jpg" width="600x" >}}

Der Lüfter verfügt über zwei Schnüre zur Steuerung, eine dreht einen Drehschalter bei jedem Zug um eine Stellung weiter.
Hierdurch werden die Lüfterstufen 1, 2, 3 und AUS durchgeschalten. Der Schalter schaltet die Phase auf den entsprechenden Draht.

Der zweite Schalter schaltet den N auf den Motor der für die Oszillation zuständig ist. Solange keine der Lüfterstufen geschaltet ist, oszilliert auch der Lüfter nicht weil keine Phase anliegt.

# RESTfan Platine

Die Platine ist im Grunde recht simpel aufgebaut. Sie verfügt über einen Hi-Link AC-DC converter der aus der Netzspannung 5VDC generiert, einem WEMOS D1 mini das die Steuerng übernimmt und 4 5VDC Finder Relais die die Stufen sowie die Oszillationschalten und somit die beiden Schalter nachbilden.


{{< thumbnail src="Restfan-1.jpg" width="600x" >}}


{{< thumbnail src="Restfan-2.jpg" width="600x" >}}

Die KiCAD files finden sich [hier](https://github.com/reaktor23/RESTfan/tree/master/KiCAD/RESTfan)

# Software

Auf dem WEMOS läuft recht trivialer code der eine Hand voll POST und GET requests entgegen nimmt die dan entsprechende Relais Konstellationen schalten.

Der Code findet sich ebenfalls [hier](https://github.com/reaktor23/RESTfan/tree/master/PlatformIO/RESTfan)

## REST endpoints

Die REST endpoints sind eigentlich selbsterklärend (alles POST requests, ausser /state)

- `http://<ip>/state` Gibt ein JSON object mit dem aktuellen state zurück

- `http://<ip>/off` Lüfter und Oszillation AUS
- `http://<ip>/speed/1` Lüfter Stufe 1
- `http://<ip>/speed/2` Lüfter Stufe 2
- `http://<ip>/speed/3` Lüfter Stufe 3
- `http://<ip>/oscillation/on` Oszillation EIN
- `http://<ip>/oscillation/off` Oszillation AUS

das ganze wird natürlich in unserem [PowerCommander](https://reaktor23.org/projects/pwrcmdr2/) integriert um einfach steuerbar zu sein.
