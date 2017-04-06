import React, { Component } from 'react';
import './App.css';

/*
 *	Features:
 *	-20 people are generated to the list on reload
 *	-New people can be added to the list
 *	-People can be removed from the list
 *	-Existing people can be edited (sorting and adding new people is disabled when editing)
 *	-Table can be sorted (by name, email or phone number and in ascending or descending order)
 *
 *	Known issues:
 *	-Sorting and adding new people is disabled when editing
 *	-Terrible feedback from input validation (especially delivery and form), the delivery method and feedback texts should be revised
 *	-User generation isn't that unique, because of the low number of variables in the arrays used for generating the people
 *
 *	Improvement ideas:
 *	-Combine repeated code to reduce clutter. Examples of this are sorting and input validation.
 *	-Make generating people more dynamic, by replacing the hard coded limitations to random number generation with the length of each array containing the randomized contents. This would enable easier addition of new variables.
 *	-Improve the feedback from the input validation.
 *	-Automatic sorting after editing. Also solve the sorting while editing or adding people or provide feedback why sorting isn't happening then (at the moment no feedback is offered).
 */

//The main component
class App extends Component {

	//Default values for the component
	constructor(props) {
		super(props);
		this.state = {
			peoplelist: generate_people(),		//the people are generated at this point
			sort_criterion: '',					//By default the sorting is by id, which isn't available otherwise (name,email,phone are possible values)
			sort_dir: ''						//The direction of the sort ascending/descending
		};
	}
	
	//If a new person is added, the sort method is checked and the information is added to the array. After the addition the array is sorted, so the information appears on the correct spot.
	handleNewPersonSubmit ( new_person ) {
		if (this.state.sort_criterion === 'name') {																								//First check the sort method, then check sort direction
			if (this.state.sort_dir === 'asc') this.setState( {peoplelist: (this.state.peoplelist.concat([new_person])).sort(name_asc)});		//Update the array with the new person added in (sort it like it was previously so the row appears on the correct spot)
			else this.setState( {peoplelist: (this.state.peoplelist.concat([new_person])).sort(name_desc)});									//Same as above, but this time if the direction was descending
		}
		if (this.state.sort_criterion === 'email') {																							//If sorted by email
			if (this.state.sort_dir === 'asc') this.setState( {peoplelist: (this.state.peoplelist.concat([new_person])).sort(email_asc)});
			else this.setState( {peoplelist: (this.state.peoplelist.concat([new_person])).sort(email_desc)});
		}
		if (this.state.sort_criterion === 'phone') {																							//If sorted by phone number
			if (this.state.sort_dir === 'asc') this.setState( {peoplelist: (this.state.peoplelist.concat([new_person])).sort(phone_asc)});
			else this.setState( {peoplelist: (this.state.peoplelist.concat([new_person])).sort(phone_desc)});
		}
		if (this.state.sort_criterion === '') this.setState( {peoplelist: this.state.peoplelist.concat([new_person])} );						//Is needed for the default setup, when the table isn't sorted
		console.log(this.state.peoplelist);
	}
	
	//If a person is deleted, the index of their information in the array is searched based on the id. After the index is found, the array is spliced based on the id. At last the array is updated to its current state. 
	handlePersonRemove ( person ) {
		//Starting value for index
		var index = -1;
		//Get the array length for loop
		var list_length = this.state.peoplelist.length;
		//Go through the array
		for( var i = 0; i < list_length; i++ ) {
			//If the id of the person being deleted has a match the index is marked
			if( this.state.peoplelist[i].id === person.id ) {
				index = i;	//set index
				break;		//no need to keep going through the array
			}
		}
		//Delete the person from the array
		this.state.peoplelist.splice( index, 1 );
		//Update the array in order to render the changes
		this.setState( {peoplelist: this.state.peoplelist} );
	}
	
	/*
	 *	Improvement note: Modify the edit to sort the table after the edit is saved.
	 */
	//If a person is edited their index is searched based on their id and updated.
	handlePersonEdit ( edited_person ) {
		//Starting value for index
		var index = -1;
		//Get the array length for loop
		var list_length = this.state.peoplelist.length;
		//Go through the array
		for( var i = 0; i < list_length; i++ ) {
			//If the id of the person being deleted has a match the index is marked
			if( this.state.peoplelist[i].id === edited_person.id ) {
				index = i;
				break;
			}
		}
		//Update the person's information
		this.state.peoplelist[index] = edited_person;
		//Update the array in order to render the changes
		this.setState( {peoplelist: this.state.peoplelist} );
	}
	
	//If the table is sorted by name
	handleNameSort (direction) {
		if (direction === 'asc') this.setState( {peoplelist: (this.state.peoplelist).sort(name_asc), sort_criteria: 'name', sort_dir: 'asc'} );
		else this.setState( {peoplelist: (this.state.peoplelist).sort(name_desc), sort_criteria: 'name', sort_dir: 'desc'} );
	}
	
	//If the table is sorted by email
	handleEmailSort (direction) {
		if (direction === 'asc') this.setState( {peoplelist: (this.state.peoplelist).sort(email_asc), sort_criteria: 'email', sort_dir: 'asc'} );
		else this.setState( {peoplelist: (this.state.peoplelist).sort(email_desc), sort_criteria: 'email', sort_dir: 'desc'} );
	}
	
	//If the table is sorted by phone number
	handlePhoneSort (direction) {
		if (direction === 'asc') this.setState( {peoplelist: (this.state.peoplelist).sort(phone_asc), sort_criteria: 'phone', sort_dir: 'asc'} );
		else this.setState( {peoplelist: (this.state.peoplelist).sort(phone_desc), sort_criteria: 'phone', sort_dir: 'desc'} );
	}
	
	//Render the app
	//Contains the Banner with logo and Participant list (the table)
	/*
	 *	Change the source path for the image.
	 */
	render() {
		return (
			<div className="AppContainer">
				<div className="Banner">
					<div><img src='http://febju.dy.fi/test/images/logo.png'/><span className="align-middle banner-content">Nord Software</span></div>
				</div>
				<div className="Participants">
					<h2 className="table-topic">List of participants</h2>
					<NewPerson onNewPersonSubmit={this.handleNewPersonSubmit.bind(this)}/>
					<PeopleList people={this.state.peoplelist} onPersonChange={this.handlePersonEdit.bind(this)} onPersonRemove={this.handlePersonRemove.bind(this)} onNameClick={this.handleNameSort.bind(this)} onEmailClick={this.handleEmailSort.bind(this)} onPhoneClick={this.handlePhoneSort.bind(this)}/>
				</div>
			</div>
		);
	}
}

/*
 *	Improvement note: Unify the sort functions to lessen the clutter and streamline the sorting process when a person is added or edited.
 */

/*
	Sorting methods for the table
	Six different methods available:
	-Names in ascending order
	-Names in descending order
	-Emails in ascending order
	-Emails in descending order
	-Phone numbers in ascending order
	-Phone numbers in descending order
*/

//Names in ascending order
function name_asc(a,b) {
	if (a.name < b.name)
		return -1;
	if (a.name > b.name)
		return 1;
	return 0;
}

//Names in descending order
function name_desc(a,b) {
	if (a.name > b.name)
		return -1;
	if (a.name < b.name)
		return 1;
	return 0;
}

//Emails in ascending order
function email_asc(a,b) {
	if (a.email < b.email)
		return -1;
	if (a.email > b.email)
		return 1;
	return 0;
}

//Emails in ascending order
function email_desc(a,b) {
	if (a.email > b.email)
		return -1;
	if (a.email < b.email)
		return 1;
	return 0;
}


//Phone numbers in ascending order
function phone_asc(a,b) {
	if (a.phone < b.phone)
		return -1;
	if (a.phone > b.phone)
		return 1;
	return 0;
}

//Phone numbers in descending order
function phone_desc(a,b) {
	if (a.phone > b.phone)
		return -1;
	if (a.phone < b.phone)
		return 1;
	return 0;
}

//Counter to keep track of number of rows being edited
var in_edit = 0;

//Function that checks if any rows are being edited
function checkEdit () {
	if (in_edit > 0) return true;	//If more than 0 rows are being edited returns true
	else return false;				//If no rows are being edited returns false
}


//Component in charge of rendering the table
class PeopleList extends Component {

	//Set default value for sorting method
	constructor(props) {
		super(props);
		this.state = {
			sort: ''			//is empty, because the table is sorted by id on default
		};
	}

	//Transfers the person who is being removed to the main component, which is in charge of the array where the people are stored
	handlePersonRemove (person) {
		this.props.onPersonRemove( person );
	}
	
	//Transfers the person who is being edited to the main component, which is in charge of the array where the people are stored
	handlePersonEdit (edited_person) {
		this.props.onPersonChange( edited_person );
	}
	
	//Called when name column head is clicked
	handleNameSort() {
		//First check if a row is being edited. Editing disables sorting as the moving rows caused problems.
		if (checkEdit() == false) {
			//if the previous sort method wasn't names in ascending order switch to it
			if (this.state.sort != 'name_asc') {
				this.props.onNameClick('asc');			//Transfer the sorting method to main component, which sorts the list an updates it's state
				this.setState({ sort: 'name_asc' });	//Set the current sort method
			}
			//if the previous sort method was names in ascending order switch to descending order
			else {
				this.props.onNameClick('desc');			//Transfer the sorting method to main component, which sorts the list an updates it's state
				this.setState({ sort: 'name_desc' });	//Set the current sort method
			}
		}
		else return false;
	}
	
	//Called when email column head is clicked
	handleEmailSort() {
		//First check if a row is being edited. Editing disables sorting as the moving rows caused problems.
		if (checkEdit() == false) {
			//if the previous sort method wasn't emails in ascending order switch to it
			if (this.state.sort != 'email_asc') {
				this.props.onEmailClick('asc');			//Transfer the sorting method to main component, which sorts the list an updates it's state
				this.setState({ sort: 'email_asc' });
			}
			//if the previous sort method was emails in ascending order switch to descending order
			else {
				this.props.onEmailClick('desc');		//Transfer the sorting method to main component, which sorts the list an updates it's state
				this.setState({ sort: 'email_desc' });	//Set the current sort method
			}
		}
		else return false;
	}
	
	//Called when phone number column head is clicked
	handlePhoneClick () {
		//First check if a row is being edited. Editing disables sorting as the moving rows caused problems.
		if (checkEdit() == false) {
			//if the previous sort method wasn't phone numbers in ascending order switch to it
			if (this.state.sort != 'phone_asc') {
				this.props.onPhoneClick('asc');			//Transfer the sorting method to main component, which sorts the list an updates it's state
				this.setState({ sort: 'phone_asc' });	//Set the current sort method
			}
			//if the previous sort method was phone numbers in ascending order switch to descending order
			else {
				this.props.onPhoneClick('desc');		//Transfer the sorting method to main component, which sorts the list an updates it's state
				this.setState({ sort: 'phone_desc' });	//Set the current sort method
			}
		}
		else return false;
	}
	
	//Render the table containing all the people added to it
	render () {
		//Variable to store all the created rows
		var rows = [];
		//"this" didn't work "that" did
		var that = this;
		//Create a row for each person listed in the array
		this.props.people.forEach(function(person) {
			rows.push(<Person person={person} onPersonEdit={that.handlePersonEdit.bind(that)} onPersonDelete={that.handlePersonRemove.bind(that)}/>);
		});
		//Get the current sort method
		const sort = this.state.sort;
		//Create default headers for all columns
		let name_head = <th onClick={this.handleNameSort.bind(this)} className="">Name</th>;
		let email_head = <th onClick={this.handleEmailSort.bind(this)} className="">E-mail address</th>;
		let phone_head = <th onClick={this.handlePhoneClick.bind(this)} className="">Phone number</th>;
		//Determine the currently used sort method and assign an arrow next to the column that the table is sorted by
		//For example if the table is sorted by names and in ascending order, an upwards arrow is added next to Name
		//Only one of these is triggered, if the table is sorted 
		if (sort === 'name_asc') name_head = <th onClick={this.handleNameSort.bind(this)}>Name <i className="material-icons">arrow_upward</i></th>;					//Names in ascending order
		if (sort === 'name_desc') name_head = <th onClick={this.handleNameSort.bind(this)}>Name <i className="material-icons">arrow_downward</i></th>;				//Names in descending order
		if (sort === 'email_asc') email_head = <th onClick={this.handleEmailSort.bind(this)}>E-mail address <i className="material-icons">arrow_upward</i></th>;	//Emails in ascending order
		if (sort === 'email_desc') email_head = <th onClick={this.handleEmailSort.bind(this)}>E-mail address <i className="material-icons">arrow_downward</i></th>;	//Emails in ascending order
		if (sort === 'phone_asc') phone_head = <th onClick={this.handlePhoneClick.bind(this)}>Phone number <i className="material-icons">arrow_upward</i></th>;		//Phone numbers in ascending order
		if (sort === 'phone_desc') phone_head = <th onClick={this.handlePhoneClick.bind(this)}>Phone number <i className="material-icons">arrow_downward</i></th>;	//Phone numbers in descending order
		//Return the complete table
		return ( 
			<div>
				<table className="table">
					<thead>
						<tr>
							{name_head}
							{email_head}
							{phone_head}
							<th className="row-normal"></th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>
			</div>
		);
	}
}

class Person extends Component {

	//Set default values for the individual person rows in the table
	constructor(props) {
		super(props);
		this.state = { 
			editable: false,					//The fields are non editable by default
			name: this.props.person.name,		//Existing values are set, as the fields need to be populated when they are edited
			email: this.props.person.email,
			phone: this.props.person.phone
		};
		this.handleEditInputChange = this.handleEditInputChange.bind(this);
	}
	
	//When remove button is pressed, delete the row
	handleRemovePerson () {
		this.props.onPersonDelete( this.props.person );
	}
	
	//When edit button is pressed, set the row to be editable
	handleEditPerson () {
		this.setState({editable: true});	//Set the determined row to be editable
		in_edit ++;							//Add one to the counter keeping track of edited files
	}
	
	//Keep track of the changed values in the input fields of the edited rows
	handleEditInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	
	//When user tries to submit their changes to an existing person the values are first validated and passed on if they are in correct format
	handleEditSubmit () {
	
		//Get values from input fields
		var id = this.props.person.id;		//Take the person's existing id
		var name = this.state.name;			//Person's full name
		var email = this.state.email;		//Person's email
		var phone = this.state.phone;		//Person's phone number
		
		//Validate values
		//If the validation fails the user is notified via alert and the inputted values are retained in their fields
		if (validateName(name) === false) {
			alert('Input name in format: Evan Example');
			return false;
		}
		if (validateEmail(email) === false) {
			alert('Input email in format: example@domain.com');
			return false;
		}
		if (validatePhone(phone) === false) {
			alert('Maximum size for phone number is 10 digits');
			return false;
		}
		
		//Create an edit person
		var edited_person = {name: name, email: email, phone: phone, id: id };
		this.props.onPersonEdit( edited_person );
		
		//Set editing mode off
		this.setState({editable: false});
		
		//Subtract one from counter, that keeps track of rows being edited
		in_edit = in_edit - 1;
	}
	
	//Reverse the changes to the fields and return the row to normal mode, if the editing is cancelled
	handleEditCancel () {
	
		//Set values of the edited fields to the state before the editing began
		this.state.name = this.props.person.name;
		this.state.email = this.props.person.email;
		this.state.phone = this.props.person.phone;
		
		//Set editing mode off
		this.setState({editable: false});
		
		//Subtract one from counter, that keeps track of rows being edited
		in_edit = in_edit - 1;
	}
	
	//Render a row containing information of one individual person
	render () {
		//Get the state of the row
		const editable = this.state.editable;
		//If the row is set to be editable, create a row with input fields and save/cancel buttons
		if (editable) {
			return (
				<tr>
					<td className="row-edit row-name">
						<input type="text" name="name"  className="form-control input-edit" placeholder="Full name" value={this.state.name} onChange={this.handleEditInputChange}/>
					</td>
					<td className="row-edit row-email">
						<input type="text" name="email"  className="form-control input-edit" placeholder="E-mail address" value={this.state.email} onChange={this.handleEditInputChange}/>
					</td>
					<td className="row-edit row-phone">
						<input type="text" name="phone" className="form-control input-edit" placeholder="Phone number" value={this.state.phone} onChange={this.handleEditInputChange}/>
					</td>
					<td className="row-edit row-buttons text-right">
						<input type="button" onClick={this.handleEditCancel.bind(this)} className="btn btn-cancel" value="Cancel"/>
						<input type="button" onClick={this.handleEditSubmit.bind(this)} className="btn btn-save" value="Save"/>
					</td>
				</tr>
			);
		}
		//If the row is not set to be editable, create normal row containing only text and edit/delete buttons
		else {
			return (
				<tr>
					<td className="row-normal row-name">{this.props.person.name}</td>
					<td className="row-normal row-email">{this.props.person.email}</td>
					<td className="row-normal row-phone">{this.props.person.phone}</td>
					<td className="text-right input-buttons row-buttons">
						<i className="material-icons" onClick={this.handleEditPerson.bind(this)}>mode_edit</i>
						<i className="material-icons" onClick={this.handleRemovePerson.bind(this)}>delete</i>
					</td>
				</tr>
			);
		}
	}
}

//Validate name with regular expression
function validateName(name) 
{
    var regexp = /([A-Z|Å|Ä|Ö)([a-z]|å|ä|ö)+(\s)([A-Z]|Å|Ä|Ö)([a-z]|å|ä|ö)/;	//format: Name Name (Checks that there is space between words and that both have capital letters in the beginning)
    return regexp.test(name);													//English alphabet modified to include Finnish/Swedish alphabets
}

//Validate email with regular expression
function validateEmail(email) 
{
    var regexp = /\S+@\S+\.\S+/;	//format: characters@characters.characters 
    return regexp.test(email);		//Not perfect but is sufficient enough
}

//Validate phone number with regular expression
function validatePhone(phone) 
{
    var regexp = /^[0-9]{10}$/;		//format: ten digits (nothing, but numbers are allowed)
    return regexp.test(phone);		//Basic length for Finnish cell phone numbers is ten, this was used as the format was not specified
}

class NewPerson extends Component {

	//Set default values and states to be used
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			phone: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	//Keep track of changes in input fields of the form
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	
	//When user tries to add new person the values are first validated and passed on if they are in correct format
	handleSubmit () {
		//First check if a row is being edited. Editing disables sorting as the moving rows caused problems and adding new person triggers sort.
		if (checkEdit() == false) {
			//Get values from input fields
			var id = 20 + additions;	//The default starting id is 20, because at first 20 people are created. Needs to be changed if more people are generated.
			var name = this.state.name;		//Person's full name
			var email = this.state.email;	//Person's email address
			var phone = this.state.phone;	//Person's phone number
			/*
			 *	Improvement note: Figure out a better solution for feedback in case of failed validations.
			 *					  Could also be combined with the check in edit phase to reduce clutter.
			 */
			//Validate values
			//If the validation fails the user is notified via alert and the inputted values are retained in their fields
			if (validateName(name) === false) {
				alert('Input name in format: Firstname Lastname');
				return false;
			}
			if (validateEmail(email) === false) {
				alert('Input email in format: example@domain.com');
				return false;
			}
			if (validatePhone(phone) === false) {
				alert('Maximum size for phone number is 10 digits');
				return false;
			}
			//Create new person
			var new_person = {name: name, email: email, phone: phone, id: id };
			this.props.onNewPersonSubmit( new_person );
			//Add one to the counter, which keeps number of additions done for the id.
			additions++;
			//Reset fields when everything else is done
			this.setState({
				name: '',
				email: '',
				phone: ''
			});
		}
		else return false;
	}
	
	//Render a table containing a form for adding a new person to the list
	render() {
		return ( 
			<table className="table">
				<tbody>
					<td className="row-edit row-name">
						<input type="text" name="name"  className="form-control input-add" placeholder="Full name" value={this.state.name} onChange={this.handleInputChange}/>
					</td>
					<td className="row-edit row-email">
						<input type="text" name="email"  className="form-control input-add" placeholder="E-mail address" value={this.state.email} onChange={this.handleInputChange}/>
					</td>
					<td className="row-edit row-phone">
						<input type="text" name="phone" className="form-control input-add" placeholder="Phone number" value={this.state.phone} onChange={this.handleInputChange}/>
					</td>
					<td className="row-edit row-buttons text-right">
						<input type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-add" value="Add new"/>
					</td>
				</tbody>
			</table>
		);
	}
}

//Counter to keep track of additions to the table, in order to give id values
var additions = 1;

/*
 *	If values are added to tables used to generate people, remember to update the limits of random numbers of being generated
 *
 *	Note: hard coded values could be changed to array lengths for more dynamic editing.	
 */

//Array of first names used in generating people
var first_names = [
	'John',
	'Jane',
	'Adam',
	'Angelica',
	'Tom',
	'Tara',
	'Henry',
	'Hannah',
	'Sam',
	'Susan'
]

//Array of last names used in generating people
var last_names = [
	'Smith',
	'Doe',
	'Jones',
	'Hammond',
	'Taylor',
	'Hamilton',
	'Park',
	'Dalton'
]

//Array of email providers used in generating email addresses for people
var email_providers = [
	'yahoo.com',
	'hotmail.com',
	'gmail.com',
]

//Array of phone number prefixes used in generating phone numbers for people
var phone_number_prefixes = [
	'050',
	'040',
	'044'
]

//Function used to generate the people and their information to be shown
function generate_people () {
	//Array for the generated people
	var people = [];
	//Generate 20 people
	for (var i = 0; i < 20; i++) {
		//The id is incremented to prevent duplicates, which could result with randomly generated values 
		var id = i+1;
		/*
		 *
		 *	This would be the place to change the hard coded values to something more dynamic
		 *
		 */
		//First names have 10 possible values so a number between 1 and 10 is generated
		var first_name = first_names[Math.floor((Math.random() * 9) + 0)];					
		//Last names have 10 possible values so a number between 1 and 7 is generated
		var last_name = last_names[Math.floor((Math.random() * 7) + 0)];
		//
		var email_provider = email_providers[Math.floor((Math.random() * 3) + 0)];
		//
		var phone_number_prefix = phone_number_prefixes[Math.floor((Math.random() * 3) + 0)];
		/*
		 *	End of the hard coded values
		 */
		//Randomly generate the last seven digits for the phone number
		var number_suffix = Math.floor(Math.random() * 9000000) + 1000000;
		//The name consist of the first and last name separated with space
		var name = first_name + ' ' + last_name;
		//Email is firstname.lastname@generatedprovider
		var email = (first_name + '.' + last_name).toLowerCase() + '@' + email_provider;
		//Phone number consists of the prefix and suffix
		var phone = phone_number_prefix + number_suffix;
		//The person is created from the information
		var person = {name: name, email: email, phone: phone, id: id};
		//The person is added to the array
		people.push(person);
	}
	return people;
}

export default App;
