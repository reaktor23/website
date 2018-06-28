---
title: R23 AudioControl
author: Valentin
description: Modul zum Auswählen einer Audioquelle
date: 2017-12-31
toc: true
draft: false
image: bruestungskanal.jpg
---


# Hintergrund 
Da es ziemlich unpraktisch war, jedes Mal das Podest zu besteigen um das Radio einzuschalten, kauften wir einen neuen Verstärker und ein Mischpult. Als die Frage aufkam, wie man seine „mobilen Endgeräte“ ohne ein viel zu langes Audiokabel einstecken kann, kam die Idee auf, ein Modul zum bequemen Wechseln des Audioeingangs zu entwickeln.


# Funktion 
Das R23 AudioControl – Modul besteht aus einem ATmega8 sowie 4 Kleinsignalrelais, die über beleuchtete Taster ausgewählt werden und damit das Handy zum Mischpult durchzuschalten. Das Handy wird mit einem kurzen Adapterkabel in die nächste, im Brüstungskanal eingebaute Audiobuchse eingesteckt. Der ATmega fragt immer wieder den Zustand der Taster ab und schaltet beim Drücken das jeweilige Relais sowie die dazugehörige LED des Tasters.


# Aufbau 
Das ganze Modul wurde auf Lochraster  („bäh, Lochraster!“) aufgebaut. Abgesichert ist das Modul mit einer 200mA-Feinsicherung. Die Massen aller Audiokanälen ist dauerhaft miteinander verbunden; Links und rechts des gewünschten Kanals wird mit den 2-Kanal-Kleisignalrelais zur Ausgangsklemme durchgeschaltet. Die Relais werden mit BS107 n-Channel LogicLevel MOSFETS angesteuert. Die Taster, LEDs und Buchsen sind jeweils fest im Kabelkanal eingeheißklebert und mit CAT7-Kabeln mit dem Modul verbunden. Strom bekommt das ganze aus einem 230V/USB Adapter, der an einer geschalteten Steckdose hängt.


# Probleme 
## Stromversorgung 
Ursprünglich war geplant, dass das Modul seinen Strom über eine USB-Buchse des Servers bekommt. Weil wir aber wollten, dass das ganze Audiozeug an einen geschalteten Stromkreis angeschlossen ist, haben wir uns für den Steckdosenadapter entschieden.

## LEDs 
Beim Testen hab ich wohl „irgendwo irgendwas irgendwie ein bisschen“ falsch angeschlossen und die LEDs waren kaputt. Da ich den Kabelkanal aufmachen müsste und die Taster wechseln müsste und dazu leider keine Lust habe, gibt es halt keine LEDs. Sorry.


# Bild von der Box 
{{< thumbnail src="box.jpg" width="400" >}}
