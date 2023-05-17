<x-mail::message>
<div class="text-base font-bold pb-large">
  Neuer Unterstützer
</div>
<div class="text-base pb-base">
  <strong>Organisation</strong><br>
  {{ $data->organisation }}
</div>
<div class="text-base pb-base">
  <strong>E-Mail</strong><br>
  {{ $data->email }}
</div>
<div class="text-base pb-base">
  <strong>Website</strong><br>
  {{ $data->website }}
</div>
</x-mail::message>
