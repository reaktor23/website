---
title: RadiationData
author: Bouni
description: Archiving Radiation Data for future data projects.
date: 2017-12-31
toc: true
draft: false
image: radiationmap-heatmap.png
---

# Linksammlung 

  * [Landesamt fuer Umwelt BW](http://www.um.baden-wuerttemberg.de)
  * [European Radiological Data Exchange Platform](http://eurdep.jrc.ec.europa.eu/Basic/Pages/Public/Home/Default.aspx)
  * [ODL Daten vom BfS](http://offenedaten.de/dataset?res_format=csv&tags=radioaktivit%C3%A4t&tags=ortsdosisleistung&groups=sonderfreigaben) -> Login fuers beziehen des CSV ist beantragt

# Datenquellen 

## Deutschland

### Bundesamt fuer Strahlenschutz 

  * Alle Daten sind auf dem [Sever des BfS](https://odlinfo.bfs.de/daten/) zu finden.
  * Eine [Beschreibung](https://odlinfo.bfs.de/daten/Datenbereitstellung-2016-04-21.pdf) was alles verfügbar ist sowie was die Daten für eine Bedeutung haben. 

## Österreich
### Lebensministerium 

  * [Karte mit Messwerten](http://www.lebensministerium.at/umwelt/strahlen-atom/strahlenschutz/strahlen-warn-system/messwerte_aktuell.html)
  * [Land-, forst- und wasserwirtschaftliches Rechenzentrum GmbH](http://sfws.lfrz.at/json.php), ohne Parameter bekommt man ein Query Formular zurück :)

    Eine spezifische Station abfragen, hier z.B. AT0912:

    - URL: http://sfws.lfrz.at/json.php
    - POST Parameter: stationcode=AT0912&a=&b=&command=getstationdata

## Spanien
  * http://www.csn.es/index.php?option=com_maps&view=mappoints&Itemid=32&lang=en

## Slowenien
  * http://www.radioaktivnost.si/ewsmambo/EWS/POZDRAV/MZO_gmaps1.html

## Belgien

  - URL: http://www.telerad.be/webservices/teleraddata/Services/TeleradWebsiteService.svc
  - POST String:

    ```
    <?xml version="1.0" encoding="utf-8"?>
        <SOAP-ENV:Envelope 
            xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <SOAP-ENV:Body>
            <GetStationValues xmlns="http://FANC.Telerad.DataServices">
            <ns1:stationId xmlns:ns1="http://FANC.Telerad.DataServices">255</ns1:stationId>
            <ns0:beginDate xmlns:ns0="http://FANC.Telerad.DataServices">2012-08-06T00:00:00.000Z</ns0:beginDate>
            <ns0:endDate xmlns:ns0="http://FANC.Telerad.DataServices">2012-08-06T23:59:59.000Z</ns0:endDate>
            <ns0:languageId xmlns:ns0="http://FANC.Telerad.DataServices">NL</ns0:languageId>
            </GetStationValues></SOAP-ENV:Body></SOAP-ENV:Envelope>
    ```

## Schweiz
### Nationale Alarmzentrale 

  * [Zeitverläufe](https://www.naz.ch/de/aktuell/zeitverlaeufe.html)
    * Stünidliche Messwerte in nS/h, Niederschlagsmessdaten in mm

### Eidgenössisches Nuklearsicherheitsinspektorat 

  * [MADUK Messnetz um Kernkraftwerke](http://www.ensi.ch/de/notfallschutz/messwerte-radioaktivitaet/)

    - http://wwwmaduk.ensi.ch/maduk/download.php

    - Post Parameter:

    ```
    datzeitvonbis=1333929600-1334098800
    stationen=B01,B02,B03,B04,B05,B06,B07,B08,B09,B10,B11,B12,B13,B14,B15,B16,B17 
    komponenten=ODL,NDS
    kkwnr=0
    kkwkennung=KKB
    datentyp=1
    datentypkennung=60
    zeitraum=09.04.12 - 10.04.12
    L=0
    ```


## Frankreich
### Reseau National 
  * [RNM](https://www.mesure-radioactivite.fr/en#/expert)
    * Karte mit den Messtellen, z.T. auch Wasser und einzelne Isotope.

# Experimente 

{{< thumbnail src="radiationmap-dots.png" width="500" >}}
Die Messdaten aller Messtellen des BfS von 0:00Uhr am 26.07.2012 als Punkt pro Messstelle.

{{< thumbnail src="radiationmap-dots-opaque.png" width="500" >}}
Die Messdaten aller Messtellen des BfS von 0:00Uhr am 26.07.2012 als Punkt pro Messstelle ohne Rand und mit Transparenz.

{{< thumbnail src="radiationmap-heatmap.png" width="500" >}}
Und zu guter Letzt noch als Heatmap, wobei die Häufung von Messtellen auch zu Farbänderungen führt.

[Hier](http://bouni.owee.de/radiationmap/) gibt es die Transparenz Variante live zu sehen. Die Daten sind momentan statisch vom **26.07.2012 0:00Uhr** und wurden vom [BfS](http://www.bfs.de/bfs) zur Verfügung gestellt!. 
