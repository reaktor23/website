---
title: pwrcmdr
author: Bouni
description: Dieses Projekt entstand aus dem powermeter Projekt. Es verbindet die Überwachung des Stromverbrauches und die Kontrolle der Stromverteilung.
date: 2017-12-31
draft: false
obsolete: true
image: bgetech_drt428b.jpg
---

# Verbrauchsmessung

Wir werden unseren Stromverbrauch messen & loggen.

Zum Einsatz kommt eine [S0 Schnittstelle](http://bg-etech.de/index.php?option=com_content&view=article&id=57&Itemid=60) (Nein nicht S0 Bus von der ISDN Anlage ;-))

{{< thumbnail src="bgetech_drt428b.jpg" width="200x" >}}
{{< thumbnail src="s0-beschaltung.png" width="400x" >}}

# Projekt History 

  * **09.08.2011**: Es wurden erste Versuche unternommen die S0 Schnittstelle auszuwerten. Leider erfolglos.
  * **30.08.2011**: Nachdem sich herausgestellt hat, dass die Drähte einfach verkehrt herum angeschlossen waren hat man auf dem Oszi nun saubere Pulse gesehen.
  * **04.10.2011**: Nach einigem Hin und Her bin ich zu dem Schluss gekommen, dass ein [Arduino Ethernet Board](http://arduino.cc/en/Main/ArduinoBoardEthernet) billiger kommt als ein kompletter Eigenbau. Gesagt, getan. Board ist hier, Prototyp des Shields ist fertig. Fehlt nur noch der Code.
  * **30.10.2012**: Da der Prototyp nie mit Code belebt wurde und sowieso eine geätzte Platine her musste, wurde heute eben diese Platine geätzt.
  * **06.11.2012**: Die fertig bestückte Platine ist komplett und die Basisfunktionen sind im Tischaufbau getestet. Nun soll die Platine noch in die Plastikbox die momentan die Schützsteuerung beherbergt eingebaut werden. <br> {{< thumbnail src="pwrcmdr-1.0.4.jpg" width="400x" >}}
  * **22.04.2014**: *Pust* *Entstaub*, Neuer Code für das Arduino Ethernet ist geschrieben und zu 75% fertig. Eine Webapplikation ist auch in der Mache um einerseits verschiedene Messwerte zu loggen, als auch diese in visuell ansprechender Form darzustellen. <br> {{< thumbnail src="powercmdr-web.png" width="600x" >}}
  * **01.05.2014**: Das System läuft soweit, leider kommt es ab und zu zu seltsamen Ausschlägen bei den gezählten S0 Pulsen. <br> {{< thumbnail src="s0-errors-1.png" width="600x" >}}
  * **13.05.2014**: Die Platine wurde nochmal überarbeitet und ein Prototyp bei pcb-devboards bestellt. <br> {{< thumbnail src="powercmdr1.0.5.png" width="600x" >}}

# Dokumentation Version 1.0.5 

  * A0: Reserve Klemme 5V-A0-GND
  * A1: Reserve Klemme 5V-A1-GND
  * A2: Reserve Klemme 5V-A2-GND
  * A3: Reserve Klemme 5V-A3-GND
  * A4: Reserve Klemme 5V-A4-GND
  * A5: Reserve Klemme 5V-A5-GND und 6x 1-wire Klemmen, per Brücke wählbar
  * 0: Reserve Klemme 5V-0-GND
  * 1: Reserve Klemme 5V-1-GND
  * 2: S0 Interface (INT0)
  * 3: Schützkreis #2 Status
  * 4: N.C. 
  * 5: Schützkreis #2 AUS
  * 6: Schützkreis #2 EIN
  * 7: Schützkreis #1 Status
  * 8: Schützkreis #1 AUS
  * 9: Schützkreis #1 EIN
  * 10: N.C.
  * 11: N.C. 
  * 12: N.C. 
  * 13: N.C.
 
# Dokumente 

[Die S0 Schnittstelle](die_s0-schnittstelle.pdf)

# Links 

[Arduino kWh Monitoring](http://playground.arduino.cc/Main/EEM12L-32AKWhMonitoring)
