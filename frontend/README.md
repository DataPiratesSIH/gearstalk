# Install MongoDB
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
Add mongo.exe to PATH

# Install virtualenv package on the terminal
```bash
py -m pip install --user virtualenv
```

# Enable scripts (Run only if scripts are disabled)
https://www.faqforge.com/windows/windows-powershell-running-scripts-is-disabled-on-this-system/
Run this command on Windows Powershell
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

# Create a virtual environment
```bash
cd backend
py -m venv env
```

# Activate environment
```bash
.\env\Scripts\activate
```

# Install packages
```bash
pip install -r requirements.txt
```

# Export dependencies
```bash
pip freeze
```
Copy paste the output to requirements.txt