---
Title: Elektro Longboard
Description: Eigenbau eines elektrisch angetriebenen Longboards 
Author: Sniser
Status: beta
Progress: 80
---

# Wie kam ich auf die Idee

* Nach dem ich in der Glotze einen Bericht über Elektroboards sah war für mich klar so ein Teil will ich auch!!
* Zunächst suchte ich im Netz nach Anbietern fertiger Boards wobei mir hier die Boards von [[http://www.evolveskateboards.de/|Evolve]]  und [[http://boostedboards.com/|Boosted]] ins Auge stachen. Da ich diese aber recht teuer fand war die Idee eines Eigenbau gebohren.
* Eine sehr hilfreiche Seite beim Stöbern nach Ideen ist das [[http://www.elektro-skateboard.de/|Elektro-Skateboard Forum]]. Hiermit möchte ich mich bei der Community des Forums bedanken, da ich dort einiges nachgelesen habe und mir Inspirationen geholt habe.

# Technische Daten

* Die benötigten Komponenten bestellte ich bei [[http://hobbyking.com/hobbyking/store/index.asp|Hobby King]] oder bei [[http://www.rcmaster.net/|RC Master]].
* [[http://hobbyking.com/hobbyking/store/__21967__Turnigy_C580L_580_Brushless_Inrunner_Motor_4kw.html|Motor]]: Turnigy C580L-580 Brushless Inrunner Motor 4kw.
* [[http://hobbyking.com/hobbyking/store/__17979__Turnigy_160A_1_8th_Scale_Sensorless_ESC_w_Fan.html|Regler]]: Turnigy 160A 1:8th Scale Sensorless ESC w/Fan.
* Da der Regler allerdings keine Bremsfunktion hat und nur mit bis zu 4s Lipos betrieben werden kann wird er durch einen [[http://www.hobbywing.com/product.asp?bigclassid13&subclassid=44|Hobbywing]] Xerun 150A ersetzt. Link zu [[http://www.rcmaster.net/de-xerun-150a-sd-esc-1-8-150a-sensorot-p229929.htm?source=ProductListAds&id=56128534817&currency=eur&country=DE&gclid=CPKyjo7JjcACFQcHwwodyzMA0g|RC Master]].
* [[http://hobbyking.com/hobbyking/store/__9515__Turnigy_5000mAh_3S_30C_Lipo_Pack.html|Akku]]: 2x Turnigy 5000mAh 3S 30C Lipo Pack.  
* Wird wenn das Board komplett fertig ist eventuell noch durch 6s Lipos ersetzt.
* [[http://arduino.cc/en/pmwiki.php?nMain/ArduinoBoardUno|Arduino Uno]]: Zur Regelung des ESC so wie ein USB Bluetooth Shield aus der Bucht und ein [[http://www.amazon.de/s/ref=nb_sb_ss_i_0_11?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&url=search-alias%3Daps&field-keywords=bluetooth+dongle&sprefix=bluetooth+d%2Caps%2C148&rh=i%3Aaps%2Ck%3Abluetooth+dongle|Bluetooth Dongle]] von Amazon hier habe ich gleich drei verschiedene gekauft, da manche Dongle die Arbeit verweigern.

# Fernbedienung Regelung des Motors

* Da mir die üblichen RC Pistolenfernbedienungen zu unhandlich sind, war ich auf der Suche nach etwas handlicherem. Da mir im [[https://www.kickstarter.com/projects/170315130/boosted-boards-the-worlds-lightest-electric-vehicl|Boosted Video]] handliche Konzeptzeichnungen ihres Controllers auffielen kam ich auf die Idee einen PS3 Move Navigations-Controller zu verwenden.
* Hier einige Links die mir dabei halfen den Code für die Steuerung zu Schreiben dort findet man auch die Bluetooth Libary und alles weitere was man zum verbinden des PS3 Controllers benötigt.
* [[http://barrettsprojects.wordpress.com/2013/01/12/usb-host-shield-demonstration/|Barrettsprojects]]
* [[http://forum.arduino.cc/index.php/topic,137747.0.html|Step by step on how to connect a PS3 controller to an arduino via Bluetooth]]  
* [[http://www.youtube.com/watch?vq3vXTX6Qe54 |How to Connect a PS3 controller to an Arduino with a USB host shield and Bluetooth dongle (Part 1)]]
* [[https://www.youtube.com/watch?v9oNMqMQrMnA|How to Connect a PS3 controller to an Arduino with a USB host shield and Bluetooth dongle (Part 2) ]]
* [[http://www.youtube.com/watch?v5ZptMi1j_w8|Control an RC car with a PS3 controller, Arduino UNO, USB host shield and Bluetooth dongle ]]
* [[http://www.circuitsathome.com/tag/ps3|Circuits@Home]]
* [[https://dl.dropboxusercontent.com/u/43421685/Website%20Content/BT_RC.ino|Example Code]]
* [[https://github.com/felis/USB_Host_Shield_2.0/wiki/PS3-Information#Video_Demonstration|GitHub]]
* Die Regler werden über eine Pulsweitenmodulation geregelt. Regler benötigen eine konstante Folge von 1ms bis 2ms Impulsen mit einem Abstand von 20ms. Wobei ein Impuls von 1,5ms dem 
* Stillstand entspricht, 2ms entsprechen Vollgas vorwärts und 1 ms entsprechen Vollgas rückwärst. Die Höhe der Spannung ist dabei abhängig vom eingesetzten BEC (Battery Eliminator Circuit). Bei einem 5v BEC, beträgt die Pulshöhe 5v, bei einem 6v BEC beträgt die Pulshöhe 6v, usw.
* Das Bild zeigt ein typisches Ausgangssignal von einem Empfänger
  {{:projects:elektrolongboard:radio_pwm.gif?200|}} 
* [[http://www.svenfroemmer.de/index.php?optioncom_wrapper&view=wrapper&Itemid=129|So funzt die Funke]]: Hier kan man alles im Detail nachlesen.

## Arduino Code

* Momentaner Status des Codes: 
* Über die PS Taste des Controllers wird der Controller mit dem Arduino connected so wie disconnected.
* Mit dem Analogbutton L2 kann die Geschwindigkeit des Motors gesteuert werden.
 
* Der Motor wird über eine Rampe gesteuert. Es ist also möglich Vollgas zu geben und der Motor wird langsam bis auf Vollgas beschleunigt. \\ 
  {{:projects:elektrolongboard:sonynav.jpg?300|}} 
* Arduino mit Oszi.
  {{:projects:elektrolongboard:foto_1.jpg?300|}}
* PWM kein Gas 1,5ms
  {{:projects:elektrolongboard:foto_2.jpg?300|}}
* PWM Vollgas vorwärts 2,0ms oder größer
  {{:projects:elektrolongboard:foto_3.jpg?300|}}
* PWM Vollgas rückwärts 1,0ms oder kleiner
  {{:projects:elektrolongboard:foto_4.jpg?300|}}

## Was ist noch zu tun 

* Bremsfunktion integrieren angedacht durch drücken des L1 Button.
* Eventuell rückwärtsfahren bin mir aber noch nicht sicher ob diese Funktion wirklich benötigt wird.
* Code herunterladen: Wird noch veröffentlicht muss noch kommentiert werden.

# Motorhalterung und Elektronikgehäuse 

* Die Motorhalterung und das Elektronikgehäuse wurde zusammen mit Zeno konstruiert und anschließend auf unserem 3D Drucker gedruckt.
* Ein Akkufach befindet sich in der Konstruktion.
* Wenn alles fertig ist werden die Komponenten hier veröffentlicht.


# Erste Testfahrten 
* So, die ersten Testfahrten sind ganz gut gelaufen. Aus dem Stand heraus lässt sich das Board nicht bewegen, jedoch reicht ein leichtes puschen aus und dann gehts ganz gut vorwärts.
* Die Motorhalterung zeigt erste Schwachstellen, da sich Risse bilden.
* Eine überarbeitete Version der Motorhalterung befindet sich im Druck. 
* //Seite noch im Aufbau//

{{:projects:elektrolongboard:img_20140425_223747.jpg?300|}}
{{:projects:elektrolongboard:img_2014.jpg?300|}}
{{:projects:elektrolongboard:img_2012.jpg?300|}}
{{:projects:elektrolongboard:img_2009.jpg?300|}}
{{:projects:elektrolongboard:img_2011.jpg?300|}}
{{:projects:elektrolongboard:img_2010.jpg?300|}}

