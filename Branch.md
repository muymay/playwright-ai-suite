For Branches nurturing the use of git commands: 
- git add
- git commit
- git push
- git pull
- git checkout

Fresh branch:
- git checkout -b <branch-name>
- git add .
- git commit -m "commit message"
- git push origin <branch-name>

Merge brach:
git add .
git commit -m "test: add copilot webtables test"
git checkout main
git merge test/copilot-webtables
git push origin main
