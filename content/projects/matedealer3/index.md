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
The controller died for some unknown reason and the MateDealer sat there in an pitiful state for a quite long time.

Then we decided to build our own new controller board based on an [Arduino Mega2560](https://store.arduino.cc/arduino-mega-2560-rev3) and an [Alix 3d3](https://www.pcengines.ch/alix3d3.htm).
[MateDealer 2.0](https://reaktor23.org/projects/matedealer2/) was born. This itteration never took of as we had problems getting the communication between the Arduino and the PC working flawlessly.

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
 * TR5 fuses to protect the moters in case of a jam
 * Control for the cooler via another relay
 * 5 inputs for motor home position switches
 * 5 inputs for slot empty switches
 * 5 inputs for product selection buttons
 * LED's for every output and input
 * 1-Wire port for temperature measurement
 * I2C port for later addons

## Pictures

The HAT in all its beauty
{{< thumbnail src="matedealer-3-1.jpg" width="600" >}}

The HAT stacked on top of the RaspberryPi and mounted to the inside of the machine using M2.5x12mm distance bolts
{{< thumbnail src="matedealer-3-2.jpg" width="600" >}}

The wiring of the product selection buttons
{{< thumbnail src="matedealer-3-3.jpg" width="600" >}}

The wiring of the motors, the home postion switches and the slot empty switches
{{< thumbnail src="matedealer-3-4.jpg" width="600" >}}

A close up of the motor wiring
{{< thumbnail src="matedealer-3-5.jpg" width="600" >}}

The 1-wire temperature sensor
{{< thumbnail src="matedealer-3-6.jpg" width="600" >}}

The external relay that switches the cooler
{{< thumbnail src="matedealer-3-7.jpg" width="600" >}}

## The procedure of getting a cool drink

1. The person approaches the machine and swipes a NFC Tag
2. The reader beeps, signaling the person that its ready
3. The person selects a drink via one of the 5 buttons at the front
4. The machine dispenses the selected bottle from the slot
5. The machine writes `user_id`, `timestamp` and `product_id` to a influx db that runs on actse[^actse]  
6. Happy person consumes the drink

## The payment

Once every month a script runs on `actse` calculating the amount a person has to pay depending on the number of consumed drinks an the costs.
That makes it easy for us to get the money and does not need to handle payments on every vend.

## What works so far

We are in a beta phase at the moment. 

We have no NFC enabled at the moment (due to the lack of code for it :-) ),
so we decided to let the users vend without authentication and decrement their funds on the whiteboard as we did the last couple of years.

The cooler is controlled depending on the temperature inside of the machine with a hysteresis that is configurable.
That allows us to only coll down when its neccessary.

## Ideas


### Cooler

We want to enable the cooling depending on the presence of hackerspace members. That Task is very easy to achieve because we can simply poll the [pwrcmder](https://reaktor23.org/projects/pwrcmdr2/) running the [SpaceAPI](https://spaceapi.io/) and use the `state` as an indicator.
Additionally we wnat to enable the cooler on Tuesdays from approximately 18:00 until midnight becuse that is the time frame when almost always memebers are present.

### Display

We want to add a nice little HDMI display to show status info, availablity of products, errors and so on.
A hot candidate for that display is one of the several 7" HDMI displays offered on AliExpress as the cost as little as 20$.


[^actse]: Our main server, actse = a computer that serves everything
