# Zway Mutt

Zway Automation module to send email via mutt

# Configuration

    - Install mutt on your device
    - Activate this module, add recipient email adresses in the preferences
    - edit the syscommands file to set permissions:
    - sudo nano /opt/z-way-server/automation/.syscommands
    - add two new lines: "echo" and "mutt" (without the quotes) 
    
# Usage
    
    This module listens to the event "mutt.sendmail". From code setup an array and emit it:
    
    var mailparams = {
        subject:    "subject",
        message:    "message"
    };
    
    self.controller.emit("mutt.sendmail", mailparams);
    
    
# License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any 
later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
