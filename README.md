Features:
-20 people are generated to the list on reload
-New people can be added to the list
-People can be removed from the list
-Existing people can be edited (sorting and adding new people is disabled when editing)
-Table can be sorted (by name, email or phone number and in ascending or descending order)

Known issues:
-Sorting and adding new people is disabled when editing
-Terrible feedback from input validation (especially delivery and form), the delivery method and feedback texts should be revised
-User generation isn't that unique, because of the low number of variables in the arrays used for generating the people

Improvement ideas:
-Combine repeated code to reduce clutter. Examples of this are sorting and input validation.
-Make generating people more dynamic, by replacing the hard coded limitations to random number generation with the length of each array containing the randomized contents. This would enable easier addition of new variables.
-Improve the feedback from the input validation.
-Automatic sorting after editing. Also solve the sorting while editing or adding people or provide feedback why sorting isn't             happening then (at the moment no feedback is offered).


How to host your own version of this:

1. git clone https://github.com/febju/ReactTest.git
2. Setup /build-folder as a root folder in Apache/Nginx.
3. Change homepage setting from package.json to fit your own hosting setup (yourownsite.com/installationfolder).
4. Change host related variables, such as path for the logo, if necessary.
5. npm run build
6. Your own version of this app should now be running.


The app is hosted at: http://projektit.febju.dy.fi/test.
