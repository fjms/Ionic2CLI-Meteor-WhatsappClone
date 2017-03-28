import { Meteor } from 'meteor/meteor';
import { Chats } from './collections/chats';
import { Messages } from './collections/messages';
import * as moment from 'moment';
import { MessageType } from './models';
import { Accounts } from 'meteor/accounts-base';


Meteor.startup(() => {
    // code to run on server at startup
    if (Meteor.settings) {
        Object.assign(Accounts._options, Meteor.settings['accounts-phone']);
        SMS.twilio = Meteor.settings['twilio'];
    }

    if (Chats.find({}).cursor.count() === 0) {
        let chatId;

        chatId = Chats.collection.insert({
            title: 'Ethan Gonzalez',
            picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
        });

        Messages.collection.insert({
            chatId: chatId,
            content: 'You on your way?',
            createAt: moment().subtract(1, 'hours').toDate(),
            type: MessageType.TEXT
        })


        chatId = Chats.collection.insert({
            title: 'Bryan Wallace',
            picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg'
        });

        Messages.collection.insert({
            chatId: chatId,
            content: 'Hey, It\'s me',
            createAt: moment().subtract(2, 'hours').toDate(),
            type: MessageType.TEXT
        })


        chatId = Chats.collection.insert({
            title: 'Avery Stewart',
            picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
        });

        Messages.collection.insert({
            chatId: chatId,
            content: 'Look at my mukluks!',
            createAt: moment().subtract(1, 'days').toDate(),
            type: MessageType.TEXT
        })


        chatId = Chats.collection.insert({
            title: 'Katie Peterson',
            picture: 'https://randomuser.me/api/portraits/thumb/women/3.jpg'
        });

        Messages.collection.insert({
            chatId: chatId,
            content: 'II should buy a cat',
            createAt: moment().subtract(4, 'days').toDate(),
            type: MessageType.TEXT
        })

        chatId = Chats.collection.insert({
            title: 'Ray Edwards',
            picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg'
        });

        Messages.collection.insert({
            chatId: chatId,
            content: 'Bye guy',
            createAt: moment().subtract(2, 'weeks').toDate(),
            type: MessageType.TEXT
        })
    }
});
