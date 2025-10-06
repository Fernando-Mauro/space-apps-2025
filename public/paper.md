# Fundamento Teórico
## Objetivo
Se busca predecir la probabilidad en un lugar y semana, de que el hongo silvestre conocido como _yema de huevo_ (Amanita caesarea) supere un umbral de producción (el cual varia dependiendo de la temporada).
## Simbología
A través del fundamento teórico utilizaremos los siguientes simbolos para representar distintas variables.


- $\wp = Probabilidad \ [0,1]$:
    La probabilidad es un valor entre 0 y 1 _(Para entender mejor, leer el método)_
- $i =$ Ubicación:
    Esta variable es usada para determinar el punto en que se llevara a cabo el calculo, este consiste de un par de datos, los cuales representan las coordenadas centrales de un rango de **** $km^2$
- $t =$ Fecha
    Esta variable representa una semana en un año dado. Esto debido al poco cambio en el comportamiento de los ecosistemas en periodos de un solo día
- $k =$ Año anterior
    Representa un año desde el que queremos hacer un procesamiento de un historico de valores, los cuales utilizamos para el calculo y comparación del NDVI
- $SM =$ Humedad del  suelo
    Este dato es medido en $m^3$ de agua por $m^3$ de suelo
- $P =$ Precipitación
    Variable utilizada para evaluar las precipitaciones en cierta zona, se mide en $mm$
- $T =$ temperatura
    Grados celsius que tiene el entorno en un periodo dado 
- $NDVI =$ Indice de Vegetación de Diferencia Normalizada
    El NDVI nos permite analizar el comportamiento fenológico de la vegetación de un área dada
---
El siguiente conjunto de datos se derivan del ánalisis del comportamiento de la amanita caesarea en entornos controlados, para comprender como se relacionan con todas las variabes que hemos mencionado anteriormente, a continuación incluimos sus significados y simbología 
- $\gamma =$ Coeficiente de afectación de NDVI
<!--Esta variable es el resultado de identificar como -->
- $\beta =$ Coeficiente de afectación de Activación
    - $\beta_1 =$ Coeficiente de afectación de la humedad del suelo
    - $\beta_2 =$ Coeficiente de afectación de temperatura
    - $\beta_3 =$ Coeficiente de afectación de la precipitación
- $\alpha = $ Coeficiente de afectación del umbral

## Procesos biológicos a tomar en cuenta
### Acumulación de recursos en años previos (Proceso lento)
Gracias al uso del NDVI podemos identificar la cantidad de carbono que ha quedado en ciertas áreas de suelo, lo que podemos utilizar para deducir el comportamiento del ecosistema (crecimiento de distintas especies) en cierto periodo de tiempo

<!-- $R_{i,t}$ -->
### Temporada actual climatica (Proceso semanal)
Variables como la precipitación, temperatura y humedad del suelo nos permitiran aproximar al comportamiento de la funga de manera "inmediata".

# Manejo de datos
## Fuentes de información
Bases de datos libres, de Satelites proveidos en los recursos del reto actual, tales como:
- [GPM (Global Precipitation Measurement)](https://gpm.nasa.gov/)
- SMAP
-
De igual modo, algunos datos se tomaron de las bdd de la INEGI (Instituto Nacional de Estadistica y Geofgrafía) para complementar algunos puntos 
## Procesamiento de la información
