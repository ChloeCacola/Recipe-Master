import { Directive, HostBinding, HostListener } from '@angular/core';

//Decorator selector good practice to define this directive leading with 'app' to avoid any existing attr names
//using square brackets to define its use as an attribute in the html code 
@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {

	//class is an array of class items; angular can set class to include open based on this boolean
	@HostBinding('class.open') open = false;


	//add the 'open' class when the element is clicked (bootstrap adds an open class on btn-group divs to 'open' a menu; will not be using bootstrap js here - only Angular interaction with DOM)

	//remove the 'open' class when it is clicked again
	@HostListener('click') onClick(eventData: Event) {
		this.open = !this.open;
	}
}