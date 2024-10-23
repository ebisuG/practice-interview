export namespace main {
	
	export class Stages {
	    Early: string[];
	    Middle: string[];
	    Late: string[];
	
	    static createFrom(source: any = {}) {
	        return new Stages(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Early = source["Early"];
	        this.Middle = source["Middle"];
	        this.Late = source["Late"];
	    }
	}
	export class Questions {
	    Stages: Stages;
	
	    static createFrom(source: any = {}) {
	        return new Questions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Stages = this.convertValues(source["Stages"], Stages);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

