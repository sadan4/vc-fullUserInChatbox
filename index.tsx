import definePlugin from "@utils/types";
import { findByCodeLazy } from "@webpack";
const normalMessageComponent = findByCodeLazy(".USER_MENTION)");
export default definePlugin({
    name: "FullUserInChatbox",
    description: "",
    authors: [
        {
            name: "sadan",
            id: 521819891141967883n
        }
    ],

    patches: [
        {
            find: "UNKNOWN_ROLE_PLACEHOLDER]",
            replacement: {
                match: /(hidePersonalInformation.*?)return/,
                replace: "$1return $self.patchChatboxMention(arguments[0]);"
            }
        }
    ],

    patchChatboxMention(props) {
        return normalMessageComponent({
            // this seems to be constant
            className: "mention",
            userId: props.id,
            channelId: props.channelId,
            //this seems to always be false/undef
            inlinePreview: undefined
        })
    },
})

