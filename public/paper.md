# Theoretical Basis
## Objective
The aim is to predict the probability, in a given location and week, that the wild mushroom known as the Caesar's mushroom (Amanita caesarea) will exceed a production threshold (which varies depending on the season).
## Symbols
Throughout the theoretical basis, we will use the following symbols to represent different variables.

- $\wp = Probability \ [0,1]$:
    The probability is a value between 0 and 1. _(For a better understanding, read the method.)_
- $i =$ Region/Point:
    This variable is used to determine the point at which the calculation will be performed. It consists of a pair of data points, which represent the central coordinates of a range of n $km^2$.
- $t =$ Date
    This variable represents one week in a given year. This is due to the little change in the behavior of ecosystems in periods of a single day
- $k =$ Previous year
    This represents a year from which we want to process historical values, which we use to calculate and compare the NDVI.
- $SM =$ Soil moisture
    This data is measured in $m^3$ of water per $m^3$ of soil.
- $P =$ Precipitation
    Variable used to evaluate precipitation in a certain area, measured in $mm$
- $T =$ Temperature
    Degrees Celsius of the environment in a given period
- $NDVI =$ Normalized Difference Vegetation Index
    The NDVI allows us to analyze the phenological behavior of vegetation in a given area
---
The following set of data is derived from the analysis of the behavior of Amanita caesarea in controlled environments, to understand how they relate to all the variables we have mentioned above. Below we include their meanings and symbols
- $\gamma =$ NDVI impact coefficient
- $\beta =$ Activation impact coefficient
    - $\beta_1 =$ Soil moisture impact coefficient
    - $\beta_2 =$ Temperature impact coefficient
    - $\beta_3 =$ Precipitation impact coefficient
- $\alpha = $ Threshold impact coefficient
## Biological processes to consider
### Accumulation of resources in previous years (slow process)
Thanks to the use of NDVI, we can identify the amount of carbon that has remained in certain areas of soil, which we can use to deduce the behavior of the ecosystem (growth of different species) over a certain period of time.
### Current climate season (weekly process)
Variables such as precipitation, temperature, and soil moisture allow us to approximate the behavior of the fungus in an “immediate” way.
# Data management
## Sources of information
Free databases from satellites provided in the resources of the current challenge, such as:
- [GPM (Global Precipitation Measurement)](https://gpm.nasa.gov/)
- SMAP
Similarly, some data were taken from the databases of INEGI (National Institute of Statistics and Geography) to complement certain points. 

## Method
1. The data for the following variables are standardized:
- $\widehat{NDVI_{i,t-k}}$
    - $\widehat{SM_{i,t}}$
- $\widehat{T_{i,t}}$
- $\widehat{P_{i,t}}$
2. We calculate the resource index
    $R = \gamma_0 + \gamma_1NVDI_{t-1}+\gamma_2NVDI_{t-2}+\gamma_3NVDI^2_{t-1}$
3. We calculate the activation index
    $A = \beta_0 + \beta_1SM + \beta_2T+\beta_3P$
4. We calculate the probability of the development threshold being exceeded
    $\text{logit}(P_{i,t}) = \alpha + \theta_1 R_{i,t} + \theta_2 A_{i,t} + \theta_3 (R_{i,t} \times A_{i,t}) + \boldsymbol{\theta_X}^\top \mathbf{X}_{i} + u_i + v_t$
    $P_{i,t} = \frac{1}{1 + e^{-\text{logit}(P_{i,t})}}$