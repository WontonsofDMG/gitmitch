class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); //X TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); //X TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; //X TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); //X TODO: replace this text by the Body of the location data
        
        if(locationData.Choices && locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        let windowkey=false;
        if(choice) {
            if (choice.Text=="Look out the window")
            {
                this.engine.storyData.windowkey="1";
            }
            if (choice.Text=="Tell him about the window"&& this.engine.storyData.windowkey=="1")
            {
            let temp=choice.Target+"1";
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, temp);
            }
            else if (choice.Text=="Turn on the TV")
            {
            
           let temp=choice.Target+ Math.floor(Math.random() * 4);
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, temp);
            }
            else{
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');