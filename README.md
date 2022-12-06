# url-extender
## Overview:

The URL-extender chrome extension generates URLs based on user input in the Chrome address bar.

## Loading the extension:

Steps to load the extension locally:

1. Type chrome://extension  in the address bar

2. Enable the developer mode toggle in the top right of the browser

3. Click on Load unpacked and import the cloned package

## How to use:

Type c/{space} to activate the extension

Type {shortenURLs} or {cluster}_{productURL}  to generate the URL for a specific app

Eg: 

URLs generated based on the keyword Wetty
![Suggestion for keyword Wetty](/assets/suggestion_Wetty.png)

URLs generated based on the keyword Loyalty
![Suggestion for keyword Loyalty](/assets/suggestion_Loyalty.png)

URLs generated based on the keyword IN
![Suggestion for keyword IN](/assets/suggestion_IN.png)

## List of supported keywords 

1. Apps
   - RMQ
   - ELASTICHQ
   - WETTY
   - ROCKMONGO
   - GRAFANA
   - KIBANA
   - PMA
2. Product
   - Loyalty
   - Insights +
   - Coupons
   - Creatives
   - Audience-manager
   - Workbench
   - Journey
3. Cluster
   - IN
   - EU
   - SG
   - TATA
   - CN
   - Staging
   - Nightly
4. SonarQube
## Things to add to the extension:

After extracting the URL-extender.zip file, the cluster and product-specific URLs used to generate the list of available URLs can be found in the file background.js. Kindly add the required cluster and product URL under the ENV and APPS object respectively to improve the extension
