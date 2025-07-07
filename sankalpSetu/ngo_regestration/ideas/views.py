
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import NGO
from django.contrib.auth.hashers import make_password

def register_ngo(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('ngo_name')
            reg_no = request.POST.get('registration_number')
            date = request.POST.get('establishment_date') or None
            ngo_type = request.POST.get('ngo_type')
            contact = request.POST.get('contact_person')
            phone = request.POST.get('phone')
            email = request.POST.get('email')
            address = request.POST.get('address')
            areas = request.POST.getlist('areas_of_work[]')
            areas_combined = ', '.join(areas)
            certificate = request.FILES.get('certificate')
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm_password')

            if password != confirm_password:
                messages.error(request, "Passwords do not match.")
                return redirect('register_ngo')

            NGO.objects.create(
                name=name,
                registration_number=reg_no,
                establishment_date=date,
                ngo_type=ngo_type,
                contact_person=contact,
                phone=phone,
                email=email,
                address=address,
                areas_of_work=areas_combined,
                certificate=certificate,
                password=make_password(password)
            )

            messages.success(request, "NGO registered successfully!")
            return redirect('register_ngo')

        except Exception as e:
            messages.error(request, f"Something went wrong: {e}")
            return redirect('register_ngo')

    return render(request, 'register.html')