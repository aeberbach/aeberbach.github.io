---
layout: post
title: "Continuous Integration with Jenkins and Xcode"
tags:
- programming
- computers
---

<meta charset="utf-8"> 
Last week (15 November 2012) I gave a short talk on setting up a continuous integration environment with Jenkins at Melbourne Cocoaheads. This is pretty much the content, converted into a blog post. Some said afterwards they would like more detail on various parts, so here is the whole thing with the shell script at the end. I hope you find it useful. I have to give a lot of thanks to all the other bloggers who wrote about their own experiences in doing this and to Stack Overflow.  
 **Motivation**  
 First up, why would you do this? There are two big problems that this setup solves. First and most broadly speaking, continuous integration solves the problem of a broken build where nobody really knows how it got broken, which change broke it or how long it has been like that. If you let your project get into that state then it will be a miracle if you ever deliver anything, dealing with this issue is a huge part of success when working in a team. Because the build is performed every time anyone submits to the repository you will know right away that there is a problem and you can fix it right away. You can also apply some appropriate penalty to the person that did it – they can buy the team a coffee or something, _pour encourager les autres_<sup>1</sup>.

<span style="line-height: 1.714285714; font-size: 1rem;">Secondly and more closely tied in with iOS development is that you can have your automated build sign and deploy a build so that anyone can point their iOS device at your distribution server with mobile Safari and have it install your build using Over The Air (OTA) provisioning. This is a feature of iOS available since release 4\. You, the developer, will no longer have to deal with Important People tapping you on the shoulder asking for a build – you can direct them to your server. Remote testers can easily grab a build too.</span>

There are some services that do this for you. Two I know of are Hockey and Testflight but this article deals with neither. They work well and provide a lot of extra features, particularly around bug and tester management, but it’s good to know what’s going on underneath. When you’ve done this setup you may choose to move on to one of those services for those extra features.

**Build on Success**  
 Before getting started with this process, make sure you can do a successful Archive build in your regular work environment. If you can’t then it isn’t going to be any easier attempting to do it headless and automatically. That means all private keys, developer certificates, provisioning profiles and Xcode functioning together happily – sometimes this is not a trivial task. As a little refresher, here’s how all the developer pieces come together in code signing.  
 [![Provisioning Ingredients diagram created in Core Data model editor](assets/pasted-graphic-15.jpg)](http://www.grayunicorn.com/wp-content/uploads/2013/12/pasted-graphic-15.jpg)  
**Virtually Risk-Free**  
 Having configured Jenkins and OTA provisioning once or twice before I hesitated to install Jenkins and jump into command line changes on the machine I work on every day. Instead I installed a clean install of OS X 10.8 (Mountain Lion) using VMware Fusion, version 4.1.4 – couldn’t be easier. OS X came from the Mac App Store, the .dmg was converted to a CDR and VMware treated it as a boot CD. According to the Mac OS X 10.8.2 EULA, you are licensed to do this if you bought your copy from the Mac App Store<sup>2</sup>.

In addition to not potentially screwing up the machine on which you earn a living, virtualisation allows you to make a snapshot of your Virtual Machine (VM) – a saved game, if you like. Any time you know you have got something right you can pause the machine and take another snapshot. Any time things go badly wrong you can revert. The cost of this is nothing but disk space.  
 First up, the new VM needs Xcode installed. When done it is a good idea to license Xcode for all the users on the machine using the terminal:  
 `sudo xcodebuild -license`  
 The reason for this is that your build system will not be interactive, it can’t pop up the click-to-accept license dialog. About 7,109 presses of the space bar will be required before you can type “agree” to accept the license for all users on the system. I would never advocate using ‘G’ to make less skip straight to the end of the license agreement, you should read it all. (This is the first of many useful bits of information from an excellent session from WWDC 2012, hereafter simply called “404″<sup>3</sup>)

Next up, java. Theoretically java should be installed for you automatically when Jenkins tries to start. Once I installed Jenkins and it did not start, reason unknown. Now I type “java” at the command prompt and cause it to be installed before installing Jenkins. This will download and install java from the Mac App Store, nice and easy. As of June 2015 you MUST choose a full SDK, not the smaller JRE as you might hope you would need.  
 Before installing Jenkins I like to create the “jenkins” user. If you install Jenkins first the user is created but not as a regular, interactive user. Creating the user will make it easier to deal with some keychain operations later. You can create this user in the normal way with System Preferences. I made “jenkins” an administrator but it probably does not have to be.  
 Finally, time to install Jenkins itself. Because of my VM strategy I downloaded the Jenkins package on the host machine then copied it into the VM via a shared folder. If things go wrong this will save you from having to download it again. The Jenkins installer is fairly simple and nothing needs to be changed though you might want to look at the customize button to check that settings have not changed since I wrote this. Jenkins should be made to run as “jenkins”, the user you just created.  
 Following a successful Jenkins installation the Jenkins console should pop up in your browser – but this isn’t successful just yet. As of version 1.489, Jenkins includes a property list that must be edited first. At the console,  
 `sudo launchctl unload /Library/LaunchDaemons/org.jenkins-ci.plist`  
 then edit it to point to user “jenkins” actual home folder, (/Users/jenkins) and  
 `sudo launchctl load /Library/LaunchDaemons/org.jenkins-ci.plist`  
 [![Jenkins home page](assets/pasted-graphic-16.jpg)](http://www.grayunicorn.com/wp-content/uploads/2013/12/pasted-graphic-16.jpg)  
Jenkins is now configured to load when the system starts and should be running! If you launch a browser and enter http://127.0.0.1:8080 you should see the Jenkins console, ready to go to work.  
 In your clean system + Xcode you have git installed, but Jenkins can’t find it yet. You need to go to “Manage Jenkins” and specify the path. That path will be `/Applications/Xcode.app/Contents/Developer/usr/bin/git.`  
 Jenkins supports SVN as installed, but I’m using git. For git users, you will want to install the Jenkins Git plugin. Github users will also want to install GitHub and GitHub API plugins. The way Jenkins uses git is to clone the repository you want to build before each build commences. I guess you could do this with a simple copy or ftp also, but I hope you are using some kind of revision control.  
 Before configuring the Jenkins build job, user “jenkins” needs a bit of setup. In your day-to-day environment, the one where you can successfully build an Archive of your project for distribution – remember that “Build on Success” section? – you have a keychain containing your developer credentials, and “jenkins” does not. You need to export them and then import them into a keychain for jenkins to use during the build. Your private key and your distribution certificate are required to make an OTA build, so export those and transfer them into the jenkins account using your public folder or similar.  
 A note about privacy – your private key is private, and important. Don’t leave it in your public folder. There is discussion on StackOverflow about how sharing a key like this is actually a bad idea, but I don’t know how to do it better.  
 Switch to the jenkins account and it’s time for some terminal magic:  
 security create-keychain -p jenkins JenkinsCI security default-keychain -s JenkinsCI security import -k JenkinsCI -P security import -k JenkinsCI  
 These commands create a new keychain named “JenkinsCI”, set it to be the default keychain, and then import the private key and distribution certificate you have transferred in to this account. The password “jenkins” is used throughout. During the build these assets will be used to sign the code with your developer credentials.  
 The provisioning profile is the last developer artefact needed. In your own account you will find it in ~/Library/MobileDevice/Provisioning Profiles, where Xcode puts it. You might choose to put that in the same place in the jenkins account, or you might choose to check it in with the code in the repository. Either way it must be available during the final stage of the build.  
 Now the configuration of the Jenkins job can begin. Each job in Jenkins is a series of steps that you define to produce some useful outcome. Here the outcome is a downloadable, installable iOS package on an accessible web server. Start by clicking “New Job” in the Jenkins console.  
 **New Job**  
 This job is configured as a “Free-style software project”. A Multi-configuration project is shown in 4043 but this is only slightly different, a little simpler. There are six main phases to configure and once you have chosen a name for this job you are done with stage one. It remains to fetch code from the repository, build it, sign it and upload it. Finally you will set up when the job will execute.  
 **Fetch**  
 Assuming you are a git user, in the Source Code Management section of job configuration you can just select git and then enter the repo location, such as https://github.com/[GitHub account]/[Project Name].git/ – on every project in your GitHub repository you will find the clone path at the top of the repo page. If your repos are not public you will need to deal with creating an ssh key for your jenkins user in your GitHub account<sup>4 </sup>– or use HTTPS, or any method that works your your repo. At the start of every job execution Jenkins will clone the entire git repository and use it for the build.

**Build**  
 At this point it is time to be sure that jenkins has access to the keychain created for this build. In the Build section of job configuration you need to add a build step, “Execute shell”. You’ll get a window that accepts shell commands which will be run. The first command to enter is security unlock-keychain -p jenkins JenkinsCI As you might guess this unlocks the keychain, allowing the rest of the script access to developer artefacts as required.  
 In this script one very important variable set for you here is $WORKSPACE – it is set by Jenkins and is your pointer into the place where everything happens. It is used many times in the build commands.  
 Before building with Xcode in Jenkins, another important variable should be set. The xcode-select command sets the default installation of Xcode that will be used. The DEVELOPER_DIR variable can override xcode-select, so it is a good idea to be sure it is set to the right value before proceeding even though in this case there is only one Xcode installed. In future you might lift this script to run on some machine with more than one.  
 The build itself is deceptively simple:  
 `xcodebuild \  
 -project [Project Name].xcodeproj \  
 -target [Target Name] \  
 -configuration Release \  
 -sdk iphoneos \  
 CODE_SIGN_IDENTITY="${SIGNING_IDENTITY}"`  
 The command xcodebuild is the main command used to execute builds from the command line with Xcode. My project is a project rather than a workspace, so I am specifying the .xcodeproj rather than the .workspace here. The target is the target name as you would see it in Xcode. The configuration is Release (but it could be Debug) and the sdk is iPhone rather than simulator.  
 Initially I had a command that looked a lot more like what is presented in 4043 but I got an error message that indicated the code signing identity was not set. Why this happened I do not know, but specifying the code signing identity, like `SIGNING_IDENTITY="iPhone Distribution: [Developer Name]"` fixed it. Now Xcode is building your code.  
 **Sign**  
 When the build has finished you have a .app file, which isn’t very useful. Because it is built for the iphoneos sdk it doesn’t run on the simulator and because it isn’t signed it doesn’t run on a device. Let’s sign it. The other command used with Xcode on the command line is xcrun – it is a two-phase thing, finding and then executing commands included with the Xcode distribution. To sign, xcrun is using a perl script included with Xcode called PackageApplication.  
 `xcrun -sdk iphoneos PackageApplication \  
 -o "${WORKSPACE}/[Target Name].ipa" \  
 -verbose "${WORKSPACE}/build/Release-iphoneos/[Target Name].app" \  
 -sign "${SIGNING_IDENTITY}" \  
 --embed "${PROVISIONING_PROFILE_DIR}/${PROVISIONING_PROFILE}"`  
 It can take a lot of options. The ones I found necessary are the output, where you specify where the .ipa archive will be place. The input, which is the .app built in the xcodebuild stage. The signing identity, also the same as the xcodebuild stage. Finally the provisioning profile, which you may have copied into the jenkins account or you may have committed with your code.  
 At this stage you may get an error – I did. Some searching revealed the cause of the error is a misconfigured Xcode installation, a soft link that should be present is not. The message is “Object file format invalid or unsuitable” which may lead you to think that the failure has something to do with the object file format. Bad error message!

It is fixed with this variable set in the script: `export CODESIGN_ALLOCATE=/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin/codesign_allocate`  
 Then – happiness. You should see “Finished: SUCCESS” in the Jenkins console output, and if you have been executing the job along with the description then the ball will be blue.  
 **Upload**  
 After all that, OTA deployment is easy. There are three parts necessary before you can get a successful download to a device. The html, which must include a link with the itms-services:scheme, linking to the property list; the property list, which must contain the location of the IPA archive created in the Sign phase; and the IPA archive itself, the payload. If all these things are together on an accessible web server, a device whose UDID is included in the provisioning profile will be able to install the app. While you have created the IPA with this process you will probably create the html and plist manually and commit it to the source repository.  
 cURL<sup>5 </sup>is a great tool included with OS X. If you have ever worked with web services you may have used it to take a look at raw JSON or XML to figure out where interesting data is. What I didn’t know is that it can send data too. Sending files via ftp turned out to be simple. one of those rare trial-and-success experiences:

`curl ${HOSTING_ADDRESS}${HOSTING_PATH} \  
 -u ${HOSTING_NAME}:${HOSTING_PWD} \  
 -Q "TYPE I" \  
 -T ${WORKSPACE}/${TARGET_NAME}.ipa`  
 Most of this should be very easy to understand. You have a host address and a path on that host where you want the html, plist and IPA to be placed. You know the name and password of an account on that server which has the required privileges to upload to it. You have the thing to send, specified by the -T argument – here the IPA is being transferred. A final note about the ftp protocol: it is ancient and assumes everything is 7-bit text unless you specify otherwise. If you transfer binaries without specifying “TYPE I” then the binary will become corrupted. For the html and plist assets this -Q argument can be omitted.  
 And you’re done! if all went well you should now be able to connect to your sever and install the app.  
 **Build Triggering**  
 Hang on, this isn’t continuous integration yet, it only happens when you click “Schedule a build”. It should happen whenever code is pushed to the repository. This is easily done. The most easy way to do it is to poll the repository at intervals to see if anything changed. In the Build Triggers section of job configuration, Poll SCM allows you to set a schedule for this polling. Once every five minutes is specified by “*/5 * * * *”. If you feel that polling in general is bad (and it is) and you are using GitHub, AND your build machine is accessible to GitHub (i.e. is on the public internet) then you can have GitHub notify your build machine when a job should be executed. Mine isn’t so I didn’t try this.<sup>6</sup>

Either way your final test is to push to your repository and wait to see if Jenkins starts a build. Make some change that you can see on your device, let it go through the whole process and download the result. Ah, satisfying.

**Next...**  
 This has been a very basic kind of how-to article. A lot more can be done to automate build, packaging and deployment and shell masters will find plenty of room to improve what I have shown here. It would be good practise to archive each deployed build. Multiple versions and configurations could be built at each build trigger. Automated testing could be run. Build lights<sup>7 </sup>could be set to show the result of each build. You could convert the VM to a physical machine to make use of a mini or similar as a build server.

**The Source**  
 Shell commands used inside Jenkins:  
 `HOSTING_NAME="[your account name on your deployment server]"  
 HOSTING_PWD="[your password on your deployment server]"  
 HOSTING_ADDRESS="ftp://ftp.[your server's address]/"  
 HOSTING_PATH="[path you will serve the build from]"  
 #  
 # interesting to know the path  
 #  
 echo ${WORKSPACE}  
 #  
 # your provisioning profile can be called, and stored, as you like  
 #  
 TARGET_NAME="[Your target name]"  
 SIGNING_IDENTITY="iPhone Distribution: [Developer Name]"  
 PROVISIONING_PROFILE_DIR="/Users/jenkins/Library/MobileDevice/Provisioning Profiles"  
 PROVISIONING_PROFILE="[Target]_Ad_Hoc.mobileprovision"  
 #  
 # always set for xcodebuild  
 #  
 export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer  
 #  
 # Lucky I found this on Stack Overflow. My build wasn't working until I did.  
 #  
 export CODESIGN_ALLOCATE="/Applications/Xcode.app/Contents/Developer/usr/bin/codesign_allocate"  
 #  
 # Unlock the keychain containing code signing keys and certificates  
 #  
 security unlock-keychain -p jenkins JenkinsCI  
 #  
 # Do the actual build  
 #  
 xcodebuild \  
 -project [Project Name].xcodeproj \  
 -target ${TARGET_NAME} \  
 -configuration Release \  
 -sdk iphoneos \  
 CODE_SIGN_IDENTITY="${SIGNING_IDENTITY}"  
 #  
 # sign the .app so that it is ready for OTA  
 #  
 xcrun -sdk iphoneos PackageApplication \  
 -o "${WORKSPACE}/${TARGET_NAME}.ipa" \  
 -verbose "${WORKSPACE}/build/Release-iphoneos/${TARGET_NAME}.app" \  
 -sign "${SIGNING_IDENTITY}" \  
 --embed "${PROVISIONING_PROFILE_DIR}/${PROVISIONING_PROFILE}"  
 #  
 # place the new assets on the server so everyone can get them  
 #  
 # index.html  
 curl ${HOSTING_ADDRESS}${HOSTING_PATH} \  
 -u ${HOSTING_NAME}:${HOSTING_PWD} \  
 -T ${WORKSPACE}/Crawler/OTA/index.html  
 # plist  
 curl ${HOSTING_ADDRESS}${HOSTING_PATH} \  
 -u ${HOSTING_NAME}:${HOSTING_PWD} \  
 -T ${WORKSPACE}/Crawler/OTA/${TARGET_NAME}.plist  
 # IPA  
 curl ${HOSTING_ADDRESS}${HOSTING_PATH} \  
 -u ${HOSTING_NAME}:${HOSTING_PWD} \  
 -Q "TYPE I" \  
 -T ${WORKSPACE}/${TARGET_NAME}.ipa`  
 And that’s it – I hope you get something out of this post.  
 1\. Voltaire wrote in Candide, of Admiral Byng’s execution: “In this country, it is wise to kill an admiral from time to time to encourage the others.”  
 2\. Apple Mac OS X 10.8.2 EULA – see section 2 (iii).  
 3\. Apple WWDC 2012 Session 404, Building from the Command Line with Xcode – this is a very practical and useful session.  
 4\. GitHub instructions on creating and installing SSH keys  
 5\. cURL website  
 6\. GitHub instructions in “WebHooks”  
 7\. [My “Angry Murloc” build light](http://www.grayunicorn.com/angry-murloc-build-light/ "RWLRWLRWLRWLRWLRWLRWL!").  
 <script type="text/javascript">// <![CDATA[<br /> var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-46719042-1']); _gaq.push(['_trackPageview']); (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();<br /> // ]]></script>