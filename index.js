/*** Mutt Z-Way module *******************************************

Version: 1.00
(c) CopyCatz, 2015
-----------------------------------------------------------------------------
Author: CopyCatz <copycat73@outlook.com>
Description: Zway Automation module to send email via mutt

******************************************************************************/

function Mutt (id, controller) {
    // Call superconstructor first (AutomationModule)
    Mutt.super_.call(this, id, controller);
    
    this.vDev           = undefined;
    
}

inherits(Mutt, AutomationModule);

_module = Mutt;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

Mutt.prototype.init = function (config) {
    Mutt.super_.prototype.init.call(this, config);

    var self = this;
    self.langFile = self.controller.loadModuleLang("Mutt");

    var devId = "Mutt_" + self.id 
    this.vDev = this.controller.devices.create({
                    deviceId: devId,
                    defaults: {
                        metrics: {
                            title: self.langFile.title,
                                text: self.langFile.nothingsentyet,
                                icon: '/ZAutomation/api/v1/load/modulemedia/Mutt/icon.png',
                            }          
                        },
                        overlay: {
                            deviceType: "text"
                        },
                        moduleId: self.id
                    });

    this.sendMail = function (parameters) {
        
        var that = self;
        var date = new Date().toLocaleString(); 
        
        console.log("[Mutt] Processing mail '" + parameters["subject"] + "'");
        self.vDev.set('metrics:text',self.langFile.lastmessagesent+": '"+parameters["subject"]+"' at "+date);
        
        _.each(that.config.recipients,function(element) {
            if (element.email) {
                system("echo '"+parameters["message"]+"' | mutt -s '" + parameters["subject"] + "' " + element.email);
            }
        });        
    };

    this.controller.on('mutt.sendmail',self.sendMail);
    
    var mailparams = {
        subject:    "Mutt started",
        message:    "message"
    };    
    self.controller.emit("mutt.sendmail", mailparams);
    
};
    


Mutt.prototype.stop = function () {
    
    var self = this;
    
    this.controller.off('mutt.sendmail',self.sendMail);
    
    if (self.vDev) {
        self.controller.devices.remove(self.vDev.id);
        self.vDev = undefined;
    }
        
    Mutt.super_.prototype.stop.call(this);
 
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------




