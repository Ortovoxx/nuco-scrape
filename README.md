# NUCO scraper
Web scraper for the NUCO room allocations site

** Exercise caution when using this tool! **

*Working as of: 26/02/2022*

Feel free to clone this repo and play around.

## How to use

Go to config.js and put in the necessary values

- cookie: Found from inspecting any request made to NUCO and looking in the "request header" on your devtools

- btoken: Found in the payload of the api call to "https://allocation.nucotravel.com/api/allocsubblock"

- bookingCode: Found in the same payload as above under "booking"

- accommodationCode: Found in the payload of the api call to "https://api.nucotravel.com/api/query" after
the two "booking" api calls

## To NUCO

If you want me to take this down just message me and I will

Although if you don't want users to see fully booked rooms I suggest stopping them from accessing that
data from the server rather than just not requesting it