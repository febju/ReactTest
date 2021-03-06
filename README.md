<b>Features:</b><br />
-20 people are generated to the list on reload<br />
-New people can be added to the list<br />
-People can be removed from the list<br />
-Existing people can be edited (sorting and adding new people is disabled when editing)<br />
-Table can be sorted (by name, email or phone number and in ascending or descending order)<br />
<br />
<b>Known issues:</b><br />
-Sorting and adding new people is disabled when editing<br />
-Terrible feedback from input validation (especially delivery and form), the delivery method and feedback texts should be revised<br />
-User generation isn't that unique, because of the low number of variables in the arrays used for generating the people<br />
<br />
<b>Improvement ideas:</b><br />
-Combine repeated code to reduce clutter. Examples of this are sorting and input validation.<br />
-Make generating people more dynamic, by replacing the hard coded limitations to random number generation with the length of each array containing the randomized contents. This would enable easier addition of new variables.<br />
-Improve the feedback from the input validation.<br />
-Automatic sorting after editing. Also solve the sorting while editing or adding people or provide feedback why sorting isn't             happening then (at the moment no feedback is offered).<br />
<br />
<br />
<b>How to host your own version of this on Linux:</b><br />
<br />
1. <i>git clone https://github.com/febju/ReactTest.git</i>
2. Setup /build-folder as a root folder in Apache/Nginx for the app. This can be achieved by modifying the configuration files. The Apache configuration files can be found from /etc/apache2/sites-available on Ubuntu. On Apache you have to add <i>Alias "/yourapp" "/installationpath/build"</i>.
3. Change homepage setting from package.json to fit your own hosting setup (yourownsite.com/yourapp).
4. <i>npm run build</i>
5. Your own version of this app should now be running and accessible on yourownsite.com/app.
<br />
<br />
<b>The app is hosted at:</b> http://projektit.febju.dy.fi/test.
