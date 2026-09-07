---
title: Mate Dealer 2.0
author: Bouni
description: The Matedealer is dead, long live the MateDealer!
date: 2017-12-31
toc: true
draft: false
obsolete: true
image: matedealer-2.0-prototype.jpg
---

# Changes to MateDealer 1.0 

  * completely custom-built VMC
  * new wiring
  * no buttons on the machine to interact with it -> web service <del>/ smartphone app</del> only
  * no MDB -> reduce the complexity 
  * a clear json based protocol


# To Do List 

  * renew the wiring of the slot motors ✓
  * renew the wiring of the slot empty switches ✓
  * renew the wiring of the motor position switches ✓ 
  * print a mount for the new vending machine controller ✓
  * design the pcb for the new vending machine controller ✓
  * mount the power supply in a nicer way than in the old MateDealer ✓
  * do the wiring on the vmc side ✓
  * write the code for the vmc ✓
  * <del>write an Android/iOS app that can control the vending machine</del> (the webapp works well for all devices)
  * write a webinterface that can control the vending machine ✓(alpha)

# Files 

  * [Eagle design files of the prototype board](openvendingshield.zip). Note that for some reason the cooler part is not working yet.

# Impressions 

The prototype of the custom VMC stacked on top of the Arduino Mega 2560<br>
{{< thumbnail src="matedealer-2.0-prototype.jpg" width="400x" >}}
The new wiring inside the cooled box<br>
{{< thumbnail src="matedealer-2.0-wiring-1.jpg" width="400x" >}}
The wiring on the side where the VMC is mounted<br>
{{< thumbnail src="matedealer-2.0-wiring-2.jpg" width="400x" >}}
The empty VMC mount<br>
{{< thumbnail src="matedealer-2.0-mount-1.jpg" width="400x" >}}
The VMC snapped into the mount<br>
{{< thumbnail src="matedealer-2.0-mount-2.jpg" width="400x" >}}
