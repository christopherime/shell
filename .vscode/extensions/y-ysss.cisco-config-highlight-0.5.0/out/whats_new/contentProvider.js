"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectManagerSocialMediaProvider = exports.ProjectManagerSponsorProvider = exports.ProjectManagerContentProvider = void 0;
const ContentProvider_1 = require("../vscode-whats-new/src/ContentProvider");
class ProjectManagerContentProvider {
    provideHeader(logoUrl) {
        return {
            logo: { src: logoUrl, height: 50, width: 50 },
            message: `<b>Project Manager</b> helps you to easily access your <b>projects</b>,
            no matter where they are located. <i>Don't miss those important projects anymore</i>.
            <br><br>You can define your own <b>Projects</b> (also called <b>Favorites</b>), or choose 
            for auto-detect <b>Git</b>, <b>Mercurial</b> or <b>SVN</b> repositories, <b>VSCode</b> 
            folders or <b>any</b> other folder.`
        };
    }
    provideChangeLog() {
        const changeLog = [];
        changeLog.push({ kind: ContentProvider_1.ChangeLogKind.VERSION, detail: { releaseNumber: "12.5.0", releaseDate: "January 2022" } });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "New setting to support symlinks on baseFolder setting",
                id: 583,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Support new MacOS File Menu API",
                id: 555,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Support new createStatusBarItem API",
                id: 521,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.CHANGED,
            detail: {
                message: "Remove watchFile interval",
                id: 575,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.INTERNAL,
            detail: "<b>Duckly</b> becomes a Sponsor"
        });
        changeLog.push({ kind: ContentProvider_1.ChangeLogKind.VERSION, detail: { releaseNumber: "12.4.0", releaseDate: "August 2021" } });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Adds <b>View as</b> option to Favorites View",
                id: 484,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Adds <b>Sort by</b> option to Favorites View",
                id: 484,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Adds setting to display the parent folder on duplicate (same-name) projects",
                id: 306,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.CHANGED,
            detail: {
                message: "Side Bar tooltips now in Markdown",
                id: 540,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.CHANGED,
            detail: {
                message: "Side Bar following <b>sortList</b> setting",
                id: 366,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.FIXED,
            detail: {
                message: "Typos in README",
                id: 532,
                kind: ContentProvider_1.IssueKind.PR,
                kudos: "@kant"
            }
        });
        changeLog.push({ kind: ContentProvider_1.ChangeLogKind.VERSION, detail: { releaseNumber: "12.3.0", releaseDate: "June 2021" } });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Organize your projects with <b>Tags</b>",
                id: 50,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Documentation about how to use the extension on Remote Development",
                id: 477,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Use specific icons for each kind of remote project",
                id: 483,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({ kind: ContentProvider_1.ChangeLogKind.VERSION, detail: { releaseNumber: "12.2.0", releaseDate: "May 2021" } });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Support <b>Virtual Workspaces</b>",
                id: 500,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Support <b>Workspace Trust</b>",
                id: 499,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Support <b>.code-workspace</b> projects located on remotes",
                id: 486,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.FIXED,
            detail: {
                message: "Favorite projects missing icons for Folders when using None or Seti Icon Theme",
                id: 496,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: lodash",
                id: 503,
                kind: ContentProvider_1.IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: ssri",
                id: 495,
                kind: ContentProvider_1.IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({ kind: ContentProvider_1.ChangeLogKind.VERSION, detail: { releaseNumber: "12.1.0", releaseDate: "March 2021" } });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Save GitHub Codespaces projects always as \"remote project\"",
                id: 479,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.CHANGED,
            detail: {
                message: "Do not show welcome message if installed by Settings Sync",
                id: 459,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.FIXED,
            detail: {
                message: "Mercurial projects not found",
                id: 438,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.INTERNAL,
            detail: {
                message: "Update whats-new submodule API",
                id: 456,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.INTERNAL,
            detail: {
                message: "Add badages to Readme",
                id: 359,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: y18n",
                id: 482,
                kind: ContentProvider_1.IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: elliptic",
                id: 472,
                kind: ContentProvider_1.IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({ kind: ContentProvider_1.ChangeLogKind.VERSION, detail: { releaseNumber: "12.0.0", releaseDate: "November 2020" } });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Adds <b>Open Settings</b> command to the Side Bar",
                id: 434,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Concatenates the \"Number of Projects\" on each Panel in the Side Bar",
                id: 267,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Adds <b>Reveal in Finder/Explorer</b> command in the Side Bar's context menu",
                id: 322,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.NEW,
            detail: {
                message: "Adds setting to decide if auto-detected projects should ignore projects found inside other projects",
                id: 189,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ContentProvider_1.ChangeLogKind.INTERNAL,
            detail: {
                message: "Use <b>vscode-ext-help-and-feedback</b> package",
                id: 432,
                kind: ContentProvider_1.IssueKind.Issue
            }
        });
        return changeLog;
    }
    provideSupportChannels() {
        const supportChannels = [];
        supportChannels.push({
            title: "Become a sponsor on Patreon",
            link: "https://www.patreon.com/alefragnani",
            message: "Become a Sponsor"
        });
        supportChannels.push({
            title: "Donate via PayPal",
            link: "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted",
            message: "Donate via PayPal"
        });
        return supportChannels;
    }
}
exports.ProjectManagerContentProvider = ProjectManagerContentProvider;
class ProjectManagerSponsorProvider {
    provideSponsors() {
        const sponsors = [];
        const sponsorCodeStream = {
            title: "Learn more about CodeStream",
            link: "https://sponsorlink.codestream.com/?utm_source=vscmarket&utm_campaign=projectmanager&utm_medium=banner",
            image: {
                dark: "https://alt-images.codestream.com/codestream_logo_projectmanager.png",
                light: "https://alt-images.codestream.com/codestream_logo_projectmanager.png"
            },
            width: 35,
            message: `<p>Eliminate context switching and costly distractions. 
                Create and merge PRs and perform code reviews from inside your 
                IDE while using jump-to-definition, your keybindings, and other IDE favorites.</p>`,
            extra: `<a title="Learn more about CodeStream" href="https://sponsorlink.codestream.com/?utm_source=vscmarket&utm_campaign=projectmanager&utm_medium=banner">
                 Learn more</a>`
        };
        sponsors.push(sponsorCodeStream);
        return sponsors;
    }
}
exports.ProjectManagerSponsorProvider = ProjectManagerSponsorProvider;
class ProjectManagerSocialMediaProvider {
    provideSocialMedias() {
        return [{
                title: "Follow me on Twitter",
                link: "https://www.twitter.com/alefragnani"
            }];
    }
}
exports.ProjectManagerSocialMediaProvider = ProjectManagerSocialMediaProvider;
//# sourceMappingURL=contentProvider.js.map