Creds
-------

git clone ssh://57965a277628e11e3f000038@belliesserver-jscottellis64.rhcloud.com/~/git/belliesserver.git/
cd belliesserver/

MongoDB 2.4 database added.  Please make note of these credentials:

   Root User:     admin
   Root Password: zuvlj-JE34QA
   Database Name: belliesserver

Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/

Info
-------

Upgraded to Bronze Plan because I exceeded my disk quota.
Added 1Gb online for $1/mo.

OpenShift Commands
-------

Checking disk usage: du -h * | sort -rh | head -50
docs: https://developers.openshift.com/managing-your-applications/filesystem.html#disk-space

git remote -v
git remote rm openshift
git remote add openshift -f ssh://57965a277628e11e3f000038@belliesserver-jscottellis64.rhcloud.com/~/git/belliesserver.git/
git merge openshift/master -s recursive -X ours
git push openshift HEAD

rhc ssh -a belliesserver

