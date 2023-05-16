<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Statamic\Facades\Entry;
use Statamic\Fields\Value;
use App\Http\Requests\TestimonialStoreRequest;
use App\Http\Requests\SupporterStoreRequest;
use Illuminate\Support\Facades\Notification;
use App\Notifications\Supporter as SupporterNotification;
use App\Notifications\Testimonial as TestimonialNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FormController extends Controller
{
  /**
   * @param TestimonialStoreRequest $request 
   * @return \Illuminate\Http\Response
   */
  public function storeTestimonial(TestimonialStoreRequest $request)
  { 
    // Create the title
    $title = $request->input('firstname') . ' ' . $request->input('name') . ', ' . $request->input('location');

    // Handle the image
    $image = $request->file('image');
    $image_name = Str::slug($title) . '-' . Str::random(16) . '.' . $image->getClientOriginalExtension();
    $path = $image->storeAs('testimonials', $image_name, 'assets');
    
    $testimonial = Entry::make()
      ->collection('testimonials')
      ->slug($title)
      ->data(
        array_merge(
          [
            'title' => $title,
            'image' => $path,
          ], 
          $request->except(
            ['image']
          )
        )
      );

    $testimonial->published(false);
    $testimonial->save();
    Notification::route('mail', env('MAIL_TO'))->notify(new TestimonialNotification($testimonial));
    return response()->json($testimonial->id, 201);
  }

  /**
   * @param SupporterStoreRequest $request 
   * @return \Illuminate\Http\Response
   */
  public function storeSupporter(SupporterStoreRequest $request)
  { 
    // Create the title
    $title = $request->input('organisation');

    // Handle the image
    $image = $request->file('image');
    $image_name = Str::slug($title) . '-' . Str::random(16) . '.' . $image->getClientOriginalExtension();
    $path = $image->storeAs('supporters', $image_name, 'assets');

    // Handle the website (make sure either http or https is set)
    $website = $request->input('website');
    if (!preg_match("~^(?:f|ht)tps?://~i", $website))
    {
      $website = "https://" . $website;
    }

    $supporter = Entry::make()
      ->collection('supporters')
      ->slug($title)
      ->data(
        array_merge(
          [
            'title' => $title,
            'website' => $website,
            'image' => $path,
          ], 
          $request->except(
            ['image', 'website']
          )
        )
      );

    $supporter->published(false);
    $supporter->save();
    Notification::route('mail', env('MAIL_TO'))->notify(new SupporterNotification($supporter));
    return response()->json($supporter->id, 201);
  }

}
