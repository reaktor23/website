---
title: Mate Dealer 3.0
author: Bouni
description: The Matedealer is dead, long live the MateDealer, round 2!
date: 2019-10-24
toc: true
draft: false
image: kicad-matedealer-3.png
---

# The background

It all started with [MateDealer 1.0](/projects/matedealer/) with all its original electronics extended by an MDB implementation.
The controller died for some unknown reason and the MateDealer sat there in a pitiful state for quite a long time.

Then we decided to build our own new controller board based on an [Arduino Mega2560](https://store.arduino.cc/arduino-mega-2560-rev3) and an [Alix 3d3](https://www.pcengines.ch/alix3d3.htm).
[MateDealer 2.0](https://reaktor23.org/projects/matedealer2/) was born. This iteration never took off as we had problems getting the communication between the Arduino and the PC working flawlessly.

Again the MateDealer was out of order for a couple of years, until we decided to take a third attempt to get it up and running.
Here's what we came up with!

# MateDealer 3.0

## Features

 * Based on a [RaspberryPi 3B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/)
 * Custom Hat designed to fit our machine (might work for yours as well)
 * 24VAC powered
 * Bridge rectifier for ~22VDC
 * DC-DC StepDown converter for 5VDC
 * [NFC Reader](https://www.acs.com.hk/en/products/3/acr122u-usb-nfc-reader/) for authentication
 * Control for 5 slot motors via relays
 * TR5 fuses to protect the motors in case of a jam
 * Control for the cooler via another relay
 * 5 inputs for motor home position switches
 * 5 inputs for slot empty switches
 * 5 inputs for product selection buttons
 * LEDs for every output and input
 * 1-Wire port for temperature measurement
 * I2C port for later addons

## Pictures

The HAT in all its beauty
{{< thumbnail src="matedealer-3-1.jpg" width="600x" >}}

The HAT stacked on top of the RaspberryPi and mounted to the inside of the machine using M2.5x12mm distance bolts
{{< thumbnail src="matedealer-3-2.jpg" width="600x" >}}

The wiring of the product selection buttons
{{< thumbnail src="matedealer-3-3.jpg" width="600x" >}}

The wiring of the motors, the home position switches and the slot empty switches
{{< thumbnail src="matedealer-3-4.jpg" width="600x" >}}

A close up of the motor wiring
{{< thumbnail src="matedealer-3-5.jpg" width="600x" >}}

The 1-wire temperature sensor
{{< thumbnail src="matedealer-3-6.jpg" width="600x" >}}

The external relay that switches the cooler
{{< thumbnail src="matedealer-3-7.jpg" width="600x" >}}

## The procedure of getting a cool drink

1. The person approaches the machine and swipes an NFC tag
2. The reader beeps, signaling the person that it's ready
3. The person selects a drink via one of the 5 buttons at the front
4. The machine dispenses the selected bottle from the slot
5. The machine writes `user_id`, `timestamp` and `product_id` to an InfluxDB that runs on actse[^actse]  
6. Happy person consumes the drink

## The payment

Once every month a script runs on `actse` calculating the amount a person has to pay depending on the number of consumed drinks and the costs.
That makes it easy for us to get the money and does not need to handle payments on every vend.

## What works so far

We are in a beta phase at the moment. 

### NFC authentication

We finally managed to integrate an ACR-122U USB NFC Reader with the MateDealer that allows us to authenticate a user. We know for sure that using the UID of an NFC badge isn't very secure but that's not the point for us.

### Cooler

The cooler is controlled depending on the temperature inside of the machine with a hysteresis that is configurable.
That allows us to only cool down when it's necessary.
The cooler is blocked when nobody is in the hackerspace to save energy or it is not Tuesday between 18:00 and 23:00 which are our main opening hours.

### Display

We ordered an 8" HDMI display on AliExpress that will replace the product labels next to the selection buttons.
That way we can show dynamic product labels and when a vend is ongoing or another information needs to be shown to the users it can be done that way.

### Accounting

We decided to send a measurement to an InfluxDB on every vend that includes `username`, `product`, `price` and a `timestamp`.
At the end of the month, we can simply run a (yet to be written) script that fetches all vends of the past month and sums up the consumption per user. 
Our treasurer then can request the amount from the user. We plan to have users top up a virtual account and the treasurer will subtract the amount from the available funds.
That way he does not have to run after people and make them pay afterwards.
We will see how that works out.

### Logging

We send several values to the InfluxDB to have a log of what is going on, at the moment these are:

- Inside temperature
- Cooler state (on/off)
- Slot states (ok/empty)

### Integration

Our [pwrCMDer](https://reaktor23.org/projects/pwrcmdr2/) runs [Home-Assistant](https://www.home-assistant.io/), from there we've integrated several InfluxDB values as sensors.
That allows us to let the pwrCMDer react to state changes.
We plan to let it send an information message when a slot runs empty for example (yet to be done) or having the states in our [SpaceAPI](https://reaktor23.org/status/) (already done)


## Fails

* I didn't know how much current the motors draw, so I guessed 1A and ordered TR5 fuses with 1A. Turns out they are labeled with 5.2A and actually draw 4.9A which on the first try blew all 5 fuses immediately.
* I used relays that are rated for 3A because I guessed the actual motor current (and I had dozens of them laying around). I decided to use them directly until they start to fail. If that happens I replace them and use additional relays that are controlled by the small ones.
* I accidentally placed a via that stitches 24VAC to GND which results in a short circuit when one of the relays is switched on. This issue could be easily fixed with a sharp cutter knife.

[^actse]: Our main server, actse = a computer that serves everything
