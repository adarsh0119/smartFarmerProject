# GitHub पर कोड अपलोड करने के लिए गाइड

## तरीका 1: Command Prompt (CMD) से

1. **Command Prompt खोलें** (PowerShell नहीं)
   - Windows Key + R दबाएं
   - `cmd` टाइप करें और Enter दबाएं

2. **Project folder में जाएं**
   ```cmd
   cd E:\smartFarmeProject
   ```

3. **ये commands एक-एक करके run करें**
   ```cmd
   git add .
   git commit -m "Enhanced Smart Farmer Assistant with new features"
   git push origin main
   ```

## तरीका 2: Git Bash से (Recommended)

1. **Git Bash खोलें**
   - Project folder में right-click करें
   - "Git Bash Here" select करें

2. **ये commands run करें**
   ```bash
   git add .
   git commit -m "Enhanced Smart Farmer Assistant with new features"
   git push origin main
   ```

## तरीका 3: VS Code से (सबसे आसान)

1. **VS Code में Source Control खोलें**
   - Left sidebar में Source Control icon (branch icon) पर क्लिक करें
   - या Ctrl+Shift+G दबाएं

2. **Changes देखें**
   - सभी modified और new files दिखेंगे

3. **Commit करें**
   - ऊपर message box में लिखें: "Enhanced Smart Farmer Assistant"
   - Commit button (✓) पर क्लिक करें

4. **Push करें**
   - "Sync Changes" या "Push" button पर क्लिक करें

## अगर Error आए

### Error: "Permission denied"
- GitHub credentials check करें
- Personal Access Token use करें

### Error: "Remote origin not found"
```cmd
git remote add origin https://github.com/your-username/your-repo.git
```

### Error: "Merge conflict"
```cmd
git pull origin main --rebase
git push origin main
```

## Changes की List

✅ AI Chatbot with voice support
✅ Video Tutorials section
✅ Crop Rotation Planner
✅ Enhanced Livestock Management
✅ Analytics dashboard
✅ Labor management
✅ Live location display
✅ Marketplace improvements
✅ Bug fixes

---

**Note:** सबसे आसान तरीका VS Code का Source Control panel है!
