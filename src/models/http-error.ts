// Extend The Built In JavaScript Error
export class HttpError extends Error {
	code: number;
	// The Code In The Constructor Runs When We Instanciate This Class
	constructor(public message: string, public errorCode: number) {
		// Call super To Call The Constructor Of The Base Class
		super(message); // Adds A Message Property To The Instances We Create Based On This Class
		this.code = errorCode; //  Adds A code Property To The Instances We Create Based On This Class
	}
}
