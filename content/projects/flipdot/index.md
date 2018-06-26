---
title: Flipdot
author: Bouni
description: Bau einer Steuerung für eine Flipdot Matrix
date: 2017-12-31
draft: false
---

# Ansteuerung

Auf der Platine ist bereits ein FP2800 verbaut, und alle Zeilen sind mit Hilfe des PCB auf diesen verdrahtet.
Der andere Anschluss jedes Pixels ist mit 2 Dioden auf je eine Leiterbahn verbunden die die Spalten miteinander verbinden.

Dieses Bild soll anhand von 4 Pixeln verdeutlichen wie die Matrix verschalten ist.
{{< thumbnail src="pixel_wiring.png" width="400" >}}

Dies ist die Transistorschaltung die wir momentan zum schalten der Reihen einsetzen.
{{< thumbnail src="transistor-flipdot.png" width="400" >}}

# Bilder
{{< vimeo id="61695002" >}}

# Videos
{{< thumbnail src="flip-dot.jpg" width="400" >}}

# Datenblätter

  * [flip.pdf](flip.pdf)
  * [FP2800 Datasheet](fp2800-datasheet.pdf)


