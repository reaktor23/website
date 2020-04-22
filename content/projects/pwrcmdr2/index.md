---
title: pwrcmdr2
author: Bouni
description: Frischzellenkur für unseren pwrCMDr!
date: 2018-10-17
draft: false
image: pwrcmdr2.png 
---

{{% box type="success" %}}
Wir haben noch 4 Platinen für den pwrCMDer übrig und würden diese gerne gratis an andere Hackerspaces abgeben wenn Interesse besteht.
Eine Liste mit Bauteilen für die Bestellung bei Pollin ist ebenfalls vorhanden.
Der einzige Knackpunkt ist das ein kleiner Layoutfehler bei den Optokopplern unterlaufen ist und das Pinout nicht stimmt.
Das kann aber mit ein wenig gutem altem Pfusch<sup><i class="fa fa-trademark" aria-hidden="true"></i></sup> behoben werden (genauere Infos auf Anfrage).
{{% /box %}}

# Warum?

Unser <strike>aktueller</strike> bisheriger pwrCMDr bestand aus einem Arduino-Ethernet auf einer selbstgeätzten Platine.
Da wir immer wieder Probleme damit haben sollte etwas neues her, das vielleicht etwas mehr Spielraum gibt um Änderungen/Verbesserungen zu integrieren.

# Hardware

## Board

Wir haben uns für ein RaspberryPi 3 B+ entschieden, das ist ausreichend flott udn erfüllt alle unsere Wunschkriterien.
Ausserdem ist es sehr viel einfacher zu bekommen als die etwas günstigeren Verterter von z.B. Aliexpress (BananaPi, etc.)

## Formfaktor

Das Raspberry Pi kommt in ein Hutschienengehäuse von [Pollin](https://www.pollin.de/p/hutschienen-gehaeuse-fuer-raspberry-pi-model-b-8te-702341).
Dieses hat ausreichend Platz für einen [HAT](https://www.raspberrypi.org/blog/introducing-raspberry-pi-hats/) auch wenn wir uns nicht an die genauen Specs halten.

## Spannungsversorgung

Wir versorgen das Board mit 24VDC da wir das eh im Schaltschrank verwenden. Das RPi wird über die Stiftleisten mit 5VDC versorgt womit die Notwendigkeit eines USB Netzteil entfällt.
Die 5V werden von einem [AliExpress DC/DC Wandler](https://de.aliexpress.com/item/-/32830931596.html) generiert der auf dem Board verlötet wird.

## Funktionen

### Schützsteuerung

Wir haben wieder unsere zweikanalige Schützsteuerung verbaut, diese ist so ausgelegt das sie zwei Externe Schütze die unsere beiden Stromkreise schalten ein bzw. ausschalten können.
Dabei war uns wichtig das das auch funktionieren muss wenn der PowerCommander einmal einen Ausfall haben sollte.
Deshalb schalten die 4 Relais einfach eine Selbsthaltung der Schütze, parallel dazu gibt es noch extern verbaute Hardware Taster damit sich das ganze auch wie bereits erwähnt im Notfall schalten lässt.

## Ein- und Ausgänge

Das Board verfügt über 4 Relais Ausgänge, dabei lässt sich über einen Lötjumper wählen ob der betreffende Kanal Schliesser oder Öffner sein soll.
Desweiteren hat das Board 8 Digitaleingänge die 24V tollerant sind und mittels Optokopplern getrennt sind.

## Sensorik

Es sind ein I2C, ein 1-Wire und ein RS485 Port vorhanden. Über diese wollen wir diverse Sensorik anbinden.

# Software

~~Wir haben [Hassio](https://www.home-assistant.io/hassio/), eine speziell auf das RaspberryPi zugeschnittene Distribution von [Home Assistant](https://www.home-assistant.io) auf dem RaspberryPi installiert.~~

Da wir immer wieder Probleme mit Hassio hatten (Micro SD Card corruption) haben wir ein Raspbian Buster installiert und darauf dann [Home Assistant](https://www.home-assistant.io) via [docker-compose](https://github.com/reaktor23/pwrcmder/).
Die Datenbank ist jetzt ein Postgres das auf unserem actse server läuft und eintsprechend in der HA config konfiguriert ist. Dies sollte die Schreibzyklen auf die SD Karte möglichst gering halten.

Das hat sehr viele Vortiele für uns:

- Ansteuerungen der GPIOs via Webinterface und/oder REST API ([rpi_gpio](https://www.home-assistant.io/components/rpi_gpio/))
- Auslesen der 1-Wire Temperatursensoren ([sensor.onewire](https://www.home-assistant.io/components/sensor.onewire/))
- Bereitstellen des Reaktorstatus via SpaceAPI ([spaceapi](https://www.home-assistant.io/components/spaceapi/))

Ausserdem die einfache Konfiguration via YAML files und das ermöglichen von Automations und vielen weiteren coolen Features!

So sieht das interface in seiner ersten Version aus, hier bietet sich noch viel Spielraum für Erweiterungen :-)

{{< thumbnail src="2020-04-22-ha.png" width="600x" >}}

## Known Bugs

### rpi_gpio

Die Eingänge werden über die rpi_gpio integration abgefragt und lösen ein event aus, allerdings kann es passieren das wenn der Kontakt prellt das der state nicht stimmt was sehr unglücklich ist.
Als Workaround haben wir das `rpi_gpio` Verzeichnis von [GitHub](https://github.com/home-assistant/core/tree/dev/homeassistant/components/rpi_gpio) nach config/custom_components/rpi_gpio kopiert und die Zeile 75 in der Datei `switch.py` geändert das sie True zurückgibt.
Dadurch wird die rpi_gpio integration als custom_component geladen und verhindert das laden der Originalen Integration.

```
    @property
    def should_poll(self):
        """No polling needed."""
        return True
```

Es wird zwar gewarnt das dies die CPU Last erhöht, allerdings konnten wir keine Nachteile durch diese Methode erkennen.
