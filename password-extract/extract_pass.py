import pikepdf
from tqdm import tqdm

# load password list
passwords = [ '04061981' ]

# iterate over passwords
for yyyy in range(1960,2021,1):
    for mm in range(1,13,1):
        for dd in range(1,32,1):
            password = f'{dd:02d}{mm:02d}{yyyy}'
            #print(f'{password} ', end ='')
            try:
                # open PDF file
                with pikepdf.open("encrypted.pdf", password=password) as pdf:
                    # Password decrypted successfully, break out of the loop
                    print("[+] Password found:", password)
                    exit(0)

            except pikepdf._qpdf.PasswordError as e:
                #print(' failed ')
                # wrong password, just continue in the loop
                continue
